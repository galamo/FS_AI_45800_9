const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const {
  authorize,
  assignRequestId,
  logRequest,
  logRequestDuration,
  errorHandler,
} = require("./middleware");

const envFilePath = path.join(__dirname, ".env");
const host = "127.0.0.1";
const port = 3000;

dotenv.config({ path: envFilePath, quiet: true });

const hasTokenValue = (value) => {
  return typeof value === "string" && value.trim() !== "";
};

const separatorBeforeAppend = (existingContents) => {
  if (existingContents.length === 0 || existingContents.endsWith("\n")) {
    return "";
  }

  return "\n";
};

const createLocalToken = () => {
  const token = crypto.randomBytes(32).toString("hex");
  const line = `BANK_API_TOKEN=${token}\n`;

  if (fs.existsSync(envFilePath)) {
    const existingContents = fs.readFileSync(envFilePath, "utf8");
    const prefix = separatorBeforeAppend(existingContents);
    fs.appendFileSync(envFilePath, `${prefix}${line}`);
  } else {
    fs.writeFileSync(envFilePath, line, { mode: 0o600 });
  }

  process.env.BANK_API_TOKEN = token;
};

if (process.env.BANK_API_TOKEN === undefined) {
  createLocalToken();
}

if (!hasTokenValue(process.env.BANK_API_TOKEN)) {
  console.error(
    "BANK_API_TOKEN is missing or empty. Set a non-empty value in the environment or in the local .env file, then start the server again.",
  );
  process.exit(1);
}

const app = express();

app.use(assignRequestId);
app.use(logRequest);
app.use(logRequestDuration);

const bankAccounts = [
  {
    id: "ba_1",
    balance: 1000,
    currency: "ILS",
    owners: [
      { name: "gal", lastname: "cohen", role: "admin" },
      { name: "dana", lastname: "levi", role: "view" },
    ],
  },
  {
    id: "ba_2",
    balance: 2500,
    currency: "ILS",
    owners: [{ name: "yossi", lastname: "mizrahi", role: "admin" }],
  },
  {
    id: "ba_3",
    balance: 500,
    currency: "USD",
    owners: [{ name: "gal", lastname: "avraham", role: "view" }],
  },
];

const isBlankString = (value) => {
  return value.trim() === "";
};

const accountHasOwner = (account, ownerName) => {
  return account.owners.some((owner) => {
    return owner.name === ownerName;
  });
};

const findAccountsByOwner = (accounts, ownerName) => {
  return accounts.filter((account) => {
    return accountHasOwner(account, ownerName);
  });
};

const findAccountById = (accounts, accountId) => {
  return accounts.find((account) => {
    return account.id === accountId;
  });
};

app.get("/health", (req, res) => {
  return res.status(200).json({ status: "ok" });
});

app.get("/bank-accounts", authorize, (req, res) => {
  const accountId = req.query.acid;
  const ownerName = req.query.owner;

  if (accountId !== undefined) {
    if (typeof accountId !== "string" || isBlankString(accountId)) {
      return res.status(400).json({
        error: "acid must be a non-empty string",
      });
    }

    const account = findAccountById(bankAccounts, accountId);

    if (account === undefined) {
      return res.status(404).json({
        message: "Bank account not found",
      });
    }

    return res.status(200).json(account);
  }

  if (ownerName === undefined) {
    return res.status(200).json(bankAccounts);
  }

  if (typeof ownerName !== "string" || isBlankString(ownerName)) {
    return res.status(400).json({
      error: "owner must be a non-empty string",
    });
  }

  const matchingAccounts = findAccountsByOwner(bankAccounts, ownerName);
  return res.status(200).json(matchingAccounts);
});

app.use(errorHandler);

app.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`);
});
