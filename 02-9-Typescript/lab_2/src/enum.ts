// delcare a set of constant values

enum Direction {
    Up = 1,
    Down = 2,
    Left = 3,
    Right = 4
}
Direction.Down
let currentDirection = Direction.Up;

console.log(currentDirection);

 enum Roles {
    Admin = 1,
    User = 2,
    Guest = 3
 } 

  enum OrderStatus {
    Pending = "pending",
    Shipped = "shipped",
    Delivered = "delivered",
    Cancelled = "cancelled"
  }

  enum PaymentStatus {
    Pending = "pending",
    Paid = "paid",
    Failed = "failed"
  }

  type OrderStatus1 = "pending" | "shipped" | "delivered" | "cancelled";