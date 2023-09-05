type Product = {
  name: string;
  description: string;
  _id: string;
  image: string;
  quantity: number;
  price: number;
  [key : string]: string | number
};