# Bank API Homework

תרגיל מקומי לניהול חשבונות בנק. המפתח הוא סוד משותף לבדיקת גישה, לא הרשאות משתמשים לפי בעלות על חשבון.

## התקנה והפעלה

מתוך תיקיית התרגיל:

```bash
npm install
npm start
```

השרת מאזין על `http://127.0.0.1:ç3000`.

## הגדרת BANK_API_TOKEN

העתיקו את `.env.example` ל־`.env` והגדירו ערך שאינו ריק:

```text
BANK_API_TOKEN=
```

אם המשתנה חסר לגמרי, ההפעלה הראשונה יוצרת מפתח אקראי ושומרת אותו ב־`.env`. אם הערך קיים אבל ריק, או מכיל רק רווחים, ההפעלה נעצרת. אין לשתף את `.env` ואין לרשום את המפתח בקוד.

## דוגמאות בקשות

בריאות, בלי מפתח:

```text
GET /health
```

כל החשבונות:

```text
GET /bank-accounts
Authorization: Bearer <BANK_API_TOKEN>
```

סינון לפי בעלים:

```text
GET /bank-accounts?owner=<OWNER_NAME>
Authorization: Bearer <BANK_API_TOKEN>
```

חיפוש לפי מזהה חשבון:

```text
GET /bank-accounts?acid=<BANK_ACCOUNT_ID>
Authorization: Bearer <BANK_API_TOKEN>
```

## עדיפות acid

אם `acid` נשלח, החיפוש הוא לפי מזהה החשבון בלבד ו־`owner` לא נבדק. בלי `acid`, הסינון הוא לפי `owner`. בלי שני הפרמטרים מוחזרים כל החשבונות.

## סדר ה־middleware

לכל בקשה, לפני הנתיבים:

1. `assignRequestId`
2. `logRequest`
3. `logRequestDuration`

`authorize` רץ רק לפני `GET /bank-accounts`. `GET /health` נשאר ציבורי. בסוף יש error middleware שמחזיר 500 עם הודעה כללית ו־`requestId`, בלי פרטי שגיאה פנימיים.
