import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('product')
export class ProductsController{
    constructor(private productsService: ProductsService){}

    @Post()
    insertProduct(
        @Body() products: {name: string, description: string, price: number}
    ){
        const productData = this.productsService.insertProducts(products);
        return {data: productData};
    }

    @Get()
    getAllProducts(){
        const products = this.productsService.getAllProducts();
        return products;
    }

    @Get(':id')
    getProductById(
        @Param('id') id: string
    ){
        const products = this.productsService.getProductById(id);
        return products;
    }

    @Patch(':id')
    updateProductById(
        @Param('id') id: string,
        @Body('title') title: string, 
        @Body('description') description: string, 
        @Body('price') price: number, 
    ){
        const products = this.productsService.updateProductById(id, title, description, price);
        return products;
    }

    @Delete(':id')
    deleteProductById(
        @Param('id') id: string
    ){
        const products = this.productsService.deleteProductById(id);
        return {data: products};
    }
}