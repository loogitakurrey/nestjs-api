import { Injectable, NotFoundException } from "@nestjs/common";
import { randomUUID } from "crypto";
import { stringify } from "querystring";
import { ProductsModel } from "./products.model";

@Injectable()
export class ProductsService{
    constructor(){}
    products: ProductsModel[] = [];

    insertProducts(
        products: {name: string, description: string, price: number}
    ){
        const id = randomUUID();
        const productData = {id:id, ...products};
        this.products.push(productData)
        return this.products;
    }

    getAllProducts(){
        return [...this.products];
    }

    getProductById(
        id: string
    ){
        const product = this.products.find(prod => prod.id === id)
        if(!product){
            throw new NotFoundException('Product Not Found');
            
        }
        return { ...product};
    }

    updateProductById(
        id: string,
        name: string,
        description: string,
        price: number
    ){
        const productIndex = this.products.findIndex(prod => prod.id === id)
        const product = this.products[productIndex]
        const updateProduct = {...product};
        if(name){
            updateProduct.name = name;
        }
        if(description){
            updateProduct.description = description;
        }
        if(price){
            updateProduct.price = price;
        }
        return this.products[productIndex] = updateProduct;
    }

    deleteProductById(
        id: string
    ){
        const productIndex = this.products.findIndex(prod => prod.id === id)
        this.products.splice(productIndex, 1);
        return [...this.products];
    }
}