const request = require("supertest");
const jwt = require('jsonwebtoken');
const app = require("../../../app");

const secretKey = 'DEMOCali';

const randomId = Math.floor(Math.random()*(100-0+1)+0);

const getErrors = (errors) => {
    let newErrors = [];
    errors.forEach(element => {
        const keys = Object.keys(element);
        newErrors.push(element[keys[0]]);
    });
    return newErrors;
}

// describe("test user signup API", () => {
//     it("should test signup success", async () => {
//         const userInfo = { email: `geekjc${randomId}@gmail.com`, name: "test1", password: "abc123456" };
//         const res = await request(app).post("/users")
//         .send(userInfo);
//         const userData = res.body.data || {};
//         expect(userData.email).toBe(userInfo.email);
//         return Promise.resolve();
//     });
//     it("should test email field got wrong format.", async () => {
//         const userInfo = { email: "geekjc100@gmail", name: "test1", password: "abc123456" };
//         const res = await request(app).post("/users")
//         .send(userInfo);
//         const errors = res.body.errors || [];
//         const newErrors = getErrors(errors);
//         const errorIndex = newErrors.indexOf("must be at an email");
//         expect(errorIndex).toBeGreaterThan(-1);
//         return Promise.resolve();
//     });
//     it("should test database already have the same email address.", async () => {
//         const userInfo = { email: `geekjc${randomId}@gmail.com`, name: "test1", password: "abc123456" };
//         const res = await request(app).post("/users")
//         .send(userInfo);
//         const errors = res.body.errors || [];
//         const newErrors = getErrors(errors);
//         const errorIndex = newErrors.indexOf("E-mail already in use");
//         expect(errorIndex).toBeGreaterThan(-1);
//         return Promise.resolve();
//     });
//     it("should test email is empty", async () => {
//         const userInfo = { email: "", name: "test1", password: "abc123456" };
//         const res = await request(app).post("/users")
//         .send(userInfo);
//         const errors = res.body.errors || [];
//         const newErrors = getErrors(errors);
//         const errorIndex = newErrors.indexOf("email is empty");
//         expect(errorIndex).toBeGreaterThan(-1);
//         return Promise.resolve();
//     });
//     it("should test name is empty", async () => {
//         const userInfo = { email: `geekjc${randomId}@gmail.com`, name: "", password: "abc123456" };
//         const res = await request(app).post("/users")
//         .send(userInfo);
//         const errors = res.body.errors || [];
//         const newErrors = getErrors(errors);
//         const errorIndex = newErrors.indexOf("name is empty");
//         expect(errorIndex).toBeGreaterThan(-1);
//         return Promise.resolve();
//     });
//     it("should test name got wrong length", async () => {
//         const userInfo = { email: `geekjc${randomId}@gmail.com`, name: "te", password: "abc123456" };
//         const res = await request(app).post("/users")
//         .send(userInfo);
//         const errors = res.body.errors || [];
//         const newErrors = getErrors(errors);
//         const errorIndex = newErrors.indexOf("must be at least 3-20 chars long");
//         expect(errorIndex).toBeGreaterThan(-1);
//         return Promise.resolve();
//     });
//     it("should test password is empty", async () => {
//         const userInfo = { email: `geekjc${randomId}@gmail.com`, name: "test1", password: "" };
//         const res = await request(app).post("/users")
//         .send(userInfo);
//         const errors = res.body.errors || [];
//         const newErrors = getErrors(errors);
//         const errorIndex = newErrors.indexOf("password is empty");
//         expect(errorIndex).toBeGreaterThan(-1);
//         return Promise.resolve();
//     });
//     it("should test password got wrong format", async () => {
//         const userInfo = { email: `geekjc${randomId}@gmail.com`, name: "test1", password: "ABC" };
//         const res = await request(app).post("/users")
//         .send(userInfo);
//         const errors = res.body.errors || [];
//         const newErrors = getErrors(errors);
//         let errorIndex = newErrors.indexOf("must be at least 6-16 chars long");
//         if(errorIndex < 0) errorIndex = newErrors.indexOf("at least one lowercase word");
//         if(errorIndex < 0) errorIndex = newErrors.indexOf("at least one number");
//         expect(errorIndex).toBeGreaterThan(-1);
//         return Promise.resolve();
//     });
// });

// describe("test user signin API", () => {
//     it("should test signin success", async () => {
//         const userInfo = { email: `geekjc123@gmail.com`, name: "test1", password: "abc123456" };
//         const res = await request(app).post("/login")
//         .send(userInfo);
//         const userData = res.body.data || {};
//         expect(userData.email).toBe(userInfo.email);
//         return Promise.resolve();
//     });
//     it("should test email field got wrong format.", async () => {
//         const userInfo = { email: "geekjc100@gmail", name: "test1", password: "abc123456" };
//         const res = await request(app).post("/login")
//         .send(userInfo);
//         const errors = res.body.errors || [];
//         const newErrors = getErrors(errors);
//         const errorIndex = newErrors.indexOf("must be at an email");
//         expect(errorIndex).toBeGreaterThan(-1);
//         return Promise.resolve();
//     });
//     it("should test email is empty", async () => {
//         const userInfo = { email: "", name: "test1", password: "abc123456" };
//         const res = await request(app).post("/login")
//         .send(userInfo);
//         const errors = res.body.errors || [];
//         const newErrors = getErrors(errors);
//         const errorIndex = newErrors.indexOf("email is empty");
//         expect(errorIndex).toBeGreaterThan(-1);
//         return Promise.resolve();
//     });
//     it("should test password is empty", async () => {
//         const userInfo = { email: `geekjc123@gmail.com`, name: "test1", password: "" };
//         const res = await request(app).post("/login")
//         .send(userInfo);
//         const errors = res.body.errors || [];
//         const newErrors = getErrors(errors);
//         const errorIndex = newErrors.indexOf("password is empty");
//         expect(errorIndex).toBeGreaterThan(-1);
//         return Promise.resolve();
//     });
//     it("should test password got wrong format", async () => {
//         const userInfo = { email: `geekjc123@gmail.com`, name: "test1", password: "ABC" };
//         const res = await request(app).post("/login")
//         .send(userInfo);
//         const errors = res.body.errors || [];
//         const newErrors = getErrors(errors);
//         let errorIndex = newErrors.indexOf("must be at least 6-16 chars long");
//         if(errorIndex < 0) errorIndex = newErrors.indexOf("at least one lowercase word");
//         if(errorIndex < 0) errorIndex = newErrors.indexOf("at least one number");
//         expect(errorIndex).toBeGreaterThan(-1);
//         return Promise.resolve();
//     });
// })

describe("test Get users API", () => {
    it("should test get users success", async () => {
        const user = { email: "geekjc123@gmail.com" };
        const token = jwt.sign(user, secretKey, { expiresIn: '12h' });
        const res = await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${token}`)
        const users = res.body.data;
        let dataLength = -1;
        if(users) dataLength = users.length;
        expect(dataLength).toBeGreaterThanOrEqual(0);
    });
    it("should test Authorization got empty token", async () => {
        const token = "";
        const res = await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${token}`)
        const code = res.statusCode;
        expect(code).toEqual(401);
    });
    it("should test Authorization wrong token", async () => {
        const token = "test11111111";
        const res = await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${token}`)
        const code = res.statusCode;
        expect(code).toEqual(401);
    });
    it("should test name fuzzy search", async () => {
        const name = "test";
        const user = { email: "geekjc123@gmail.com" };
        const token = jwt.sign(user, secretKey, { expiresIn: '12h' });
        const res = await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${token}`)
            .query({
                name,
            })
        const users = res.body.data;
        let searchSuccess = "false";
        if(!users.some(user => user.indexOf(name) < 0)) searchSuccess = "true";
        expect(searchSuccess).toBe("true");
    });
    it("should test pageSize got greater than 50", async () => {
        const pageSize = 99;
        const user = { email: "geekjc123@gmail.com" };
        const token = jwt.sign(user, secretKey, { expiresIn: '12h' });
        const res = await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${token}`)
            .query({
                pageSize,
            })
        const users = res.body.data;
        let dataLength = -1;
        if(users) dataLength = users.length;
        expect(dataLength).toBeLessThanOrEqual(50);
    });
})