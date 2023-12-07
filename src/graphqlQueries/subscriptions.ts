import { gql } from "@apollo/client";
//השאילתה הזו מגדירה איזה מידע יוחזר במקרה של 
//ProductCreated Subscription
//בשונה מסוגי בקשות אחרות, המידע יתקבל כשהשרת
//ביצירת מוצר - subscription- יפעיל אצלו את ה
export const PRODUCTS_SUBSCRIPTION = gql`
  subscription ProductCreated {
    productCreated {
      name
      description
      price
      quantity
      image
      _id
  }
  }
`;