import * as mongoose from 'mongoose';

export const ProductSchema = mongoose.Schema({
  title: String,
  description: String,
  price: Number,
});

export class Product {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public price: number,
  ) {}
}
