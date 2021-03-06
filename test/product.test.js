const app=  require("../index");
const supertest = require("supertest");
const Category  =require("../models/Category")
const Product  =require("../models/Product")
const request = supertest(app);
const mongoose = require("mongoose");
const databaseName = "testuserroute";
const path  =require("path")

beforeAll(async () => {
    const url = `mongodb://127.0.0.1/${databaseName}`
    await mongoose.connect(url, { useNewUrlParser: true });

});

afterAll(async () => {
    //disconnect mongoose
    await mongoose.connection.close()
});

describe("GET Products /:id /GET", ()=>{

    beforeEach(async ()=>{
        const categorycreated = {
            _id: "628cd6d47eb286cf58a2e363",
            name:"phone",
            icon:"dev-9665",
            color:"blue",
        }

        const product = {
            _id: "6234a9c563734dda3c74e62b",
            description: "testing product",
            richDescription: "maybe working perfect",
            image: "img/98-a-63es",
            images:[
                
            ],
            brand: "apple",
            price: 96352,
            category: "628cd6d47eb286cf58a2e363",
            countInStock : 96,
            rating: 4,
            numReviews: 65436,
            isFeatured: false
        }

        await Product(product).save();
        await Category(categorycreated).save();
    });

    afterEach(async()=>{
        await Category.deleteMany();
        await Product.deleteMany();
    })

    it("Get product - success ", async()=>{
        const res = await request.get("/api/v1/products/6234a9c563734dda3c74e62b")
        
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toEqual("Product found")
        expect(res.body.data).toBeDefined();
    })

    it("Get product - failure - Product doesn't exist", async()=>{
        const res = await request.get("/api/v1/products/6234aa30dbe66dfc1633323c");

        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({
            success: false,
            message : "Product you requested doesn't exist"
        })
    })

    it("Get all products -success", async()=>{
        const res  =await request.get("/api/v1/products");

        expect(res.body).toBeTruthy();
        expect(res.body.message).toEqual("All products fetching success");
        expect(res.statusCode).toBe(200);
    });
});

describe("Delete Products /DELETE", ()=>{

    beforeAll(async()=>{
        const categorycreated = {
            _id: "628cd6d47eb286cf58a2e363",
            name:"phone",
            icon:"dev-9665",
            color:"blue",
        }

        const product = {
            _id: "6234a9c563734dda3c74e62b",
            description: "testing product",
            richDescription: "maybe working perfect",
            image: "img/98-a-63es",
            images:[
                
            ],
            brand: "apple",
            price: 96352,
            category: "628cd6d47eb286cf58a2e363",
            countInStock : 96,
            rating: 4,
            numReviews: 65436,
            isFeatured: false
        }

        await Product(product).save();
        await Category(categorycreated).save();
    });

    afterAll(async()=>{
        await Category.deleteMany();
    });

    it("Delete Product - Success -  Deleted", async()=>{

        const res = await request.delete("/api/v1/products/6234a9c563734dda3c74e62b");

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            success: true,
            message : "Product successfully deleted"
        });
    })

    it("Delete Product - failure - Doesn't exist", async()=>{

        const res = await request.delete("/api/v1/products/6234aa30dbe66dfc1633323c");

        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({
            success: false,
            message : "Product doesn't exist"
        })
    })
});

describe("Aggregrate Products /GET/SUCCESS", ()=>{

    beforeAll(async()=>{
        const categorycreated = {
            _id: "628cd6d47eb286cf58a2e363",
            name:"phone",
            icon:"dev-9665",
            color:"blue",
        }

        const product = {
            _id: "6234a9c563734dda3c74e62b",
            description: "testing product",
            richDescription: "maybe working perfect",
            image: "img/98-a-63es",
            images:[
                
            ],
            brand: "apple",
            price: 96352,
            category: "628cd6d47eb286cf58a2e363",
            countInStock : 96,
            rating: 4,
            numReviews: 65436,
            isFeatured: false
        }

        await Product(product).save();
        await Category(categorycreated).save();
    });

    afterAll(async()=>{
        await Category.deleteMany();
        await Product.deleteMany();
    });

    it("Get Products count /DB", async()=>{

        const res = await request.get("/api/v1/products/get/count")
        
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
    })

});

describe("Aggregrate Products /GET/FAILURE", ()=>{

    it("Get Products /NULL", async()=>{
        const res = await request.get("/api/v1/products/get/count")
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({
            success: false,
            message: "Count error!"
        })
    })
});

describe("Featured Products /FEATURED/COUNT/SUCCESS", ()=>{

    beforeAll(async()=>{
        const categorycreated = {
            _id: "628cd6d47eb286cf58a2e363",
            name:"phone",
            icon:"dev-9665",
            color:"blue",
        }

        const product = 
        {
            _id: "6234a9c563734dda3c74e62b",
            description: "testing product",
            richDescription: "maybe working perfect",
            image: "img/98-a-63es",
            images:[
                
            ],
            brand: "apple",
            price: 96352,
            category: "628cd6d47eb286cf58a2e363",
            countInStock : 96,
            rating: 4,
            numReviews: 65436,
            isFeatured: true
        }

        await Product(product).save();
        await Category(categorycreated).save();
    });

    afterAll(async()=>{
        await Category.deleteMany();
        await Product.deleteMany();
    });

    it("Get Featured /GET/ SUCCESS", async()=>{

        const res  =await request.get("/api/v1/products/get/featured/0");
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBeTruthy();

    });
});

describe("Featured Products /FEATURED/COUNT/ FAILURE", ()=>{

    beforeAll(async()=>{
        const categorycreated = {
            _id: "628cd6d47eb286cf58a2e363",
            name:"phone",
            icon:"dev-9665",
            color:"blue",
        }

        const product = 
        {
            _id: "6234a9c563734dda3c74e62b",
            description: "testing product",
            richDescription: "maybe working perfect",
            image: "img/98-a-63es",
            images:[
                
            ],
            brand: "apple",
            price: 96352,
            category: "628cd6d47eb286cf58a2e363",
            countInStock : 96,
            rating: 4,
            numReviews: 65436,
            isFeatured: false
        }

        await Product(product).save();
        await Category(categorycreated).save();
    });

    afterAll(async()=>{
        await Category.deleteMany();
        await Product.deleteMany();
    });

    it("Get Featured /GET/ FAILURE", async()=>{

        const res  =await request.get("/api/v1/products/get/featured/0");
        expect(res.body.data).toEqual([]);
    });
});

describe("POST Product /POST", ()=>{

    beforeEach(async()=>{
        const categorycreated = {
            _id: "628cd6d47eb286cf58a2e363",
            name:"phone",
            icon:"dev-9665",
            color:"blue",
        }
        await Category(categorycreated).save();
    });

    afterEach(async()=>{
        await Category.deleteMany();
        await Product.deleteMany();
    });

    it("Product post - success-statuscode/201", async ()=>{
       
        const file  = path.resolve(__dirname, `./file.jpg`);
        const res  =await request.post("/api/v1/products").send({
            _id: "6234a9c563734dda3c74e62b",
            name:"phje",
            description: "testing product",
            richDescription: "maybe working perfect",
            image: "img/98-a-63es",
            images:[
                
            ],
            brand: "apple",
            price: 96352,
            category: "628cd6d47eb286cf58a2e363",
            countInStock : 96,
            rating: 4,
            numReviews: 65436,
            isFeatured: false,
            file: file
        })
        expect(res.statusCode).toBe(201);
    });

    it("Content Type Json In headers", async()=>{
        const file  = path.resolve(__dirname, `./file.jpg`);
        const res = await request.post("/api/v1/products").send({
            _id: "6234a9c563734dda3c74e62b",
            name:"phje",
            description: "testing product",
            richDescription: "maybe working perfect",
            image: "img/98-a-63es",
            images:[
                
            ],
            brand: "apple",
            price: 96352,
            category: "628cd6d47eb286cf58a2e363",
            countInStock : 96,
            rating: 4,
            numReviews: 65436,
            isFeatured: false,
            file: file
        })
        expect(res.headers['content-type']).toEqual(expect.stringContaining("json"));
    });

    it("Response Body- Valid", async()=>{
        const file  = path.resolve(__dirname, `./file.jpg`);
        const res = await request.post("/api/v1/products").send({
            _id: "6234a9c563734dda3c74e62b",
            description: "testing product",
            name:"phje",
            richDescription: "maybe working perfect",
            image: "img/98-a-63es",
            images:[
                
            ],
            brand: "apple",
            price: 96352,
            category: "628cd6d47eb286cf58a2e363",
            countInStock : 96,
            rating: 4,
            numReviews: 65436,
            isFeatured: false,
            file: file
        })
        console.log(file);
        expect(res.body).toBeTruthy();
        expect(res.body._id).toBeDefined();
    });

    
    it('Input field missing/invalid - failure 500', async()=>{
        const file  = path.resolve(__dirname, `./file.jpg`);
        const res = await request.post("/api/v1/products").send({
            _id: "6234a9c563734dda3c74e62b",
            name:"phje",
            description: "",
            richDescription: "maybe working perfect",
            image: "img/98-a-63es",
            images:[
                
            ],
            brand: "apple",
            price: 96352,
            category: "628cd6d47eb286cf58a2e363",
            countInStock : 96,
            rating: 4,
            numReviews: 65436,
            isFeatured: false,
            file: file
        })
        
        expect(res.statusCode).toBe(500);
    });
});

describe("Product Update /PUT", ()=>{

    beforeEach(async()=>{

        const product = {
            _id: "6234a9c563734dda3c74e62b",
            name:"phel",
            description: "testing product",
            richDescription: "maybe working perfect",
            image: "img/98-a-63es",
            images:[
                
            ],
            brand: "apple",
            price: 96352,
            category: "628cd6d47eb286cf58a2e363",
            countInStock : 96,
            rating: 4,
            numReviews: 65436,
            isFeatured: false
        }
    
        const categorycreated = {
            _id: "628cd6d47eb286cf58a2e363",
            name:"phone",
            icon:"dev-9665",
            color:"blue",
        }

        await Category(categorycreated).save();
        await Product(product).save();
    
    });

    afterEach(async()=>{
        await Category.deleteMany();
        await Product.deleteMany();
    });

    it("Product update - Failure - Not updated", async()=>{

        const res = await request.put("/api/v1/products/6234a9c563714dda3c74e62b").send({
            name: "updated",
            description:"updated one"
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({
            status: false,
            message: "Product doesnt exist"
        })
    })

    it("Product update - Success - Successfully updated", async()=>{
        const res = await request.put("/api/v1/products/6234a9c563734dda3c74e62b").send({
            name: "updated",
            description:"updated one"
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBeTruthy();
        expect(res.body.message).toEqual("Successfully updated")
    })

})


