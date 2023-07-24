const request = require("supertest");
const app = require("../../../app");

const randomId = Math.floor(Math.random()*(100-0+1)+0);

const getErrors = (errors) => {
    let newErrors = [];
    errors.forEach(element => {
        const keys = Object.keys(element);
        newErrors.push(element[keys[0]]);
    });
    return newErrors;
}

describe("test user signup API", () => {
    it("should test signup success", async () => {
        const userInfo = { email: `geekjc${randomId}@gamil.com`, name: "test1", password: "abc123456" };
        const res = await request(app).post("/users")
        .send(userInfo);
        const userData = res.body.data || {};
        expect(userData.email).toBe(userInfo.email);
        return Promise.resolve();
    });
    it("should test email field got wrong format.", async () => {
        const userInfo = { email: "geekjc100@gamil", name: "test1", password: "abc123456" };
        const res = await request(app).post("/users")
        .send(userInfo);
        const errors = res.body.errors || [];
        const newErrors = getErrors(errors);
        const errorIndex = newErrors.indexOf("must be at an email");
        expect(errorIndex).toBeGreaterThan(-1);
        return Promise.resolve();
    });
    it("should test database already have the same email address.", async () => {
        const userInfo = { email: `geekjc${randomId}@gamil.com`, name: "test1", password: "abc123456" };
        const res = await request(app).post("/users")
        .send(userInfo);
        const errors = res.body.errors || [];
        const newErrors = getErrors(errors);
        const errorIndex = newErrors.indexOf("E-mail already in use");
        expect(errorIndex).toBeGreaterThan(-1);
        return Promise.resolve();
    });
    it("should test email is empty", async () => {
        const userInfo = { email: "", name: "test1", password: "abc123456" };
        const res = await request(app).post("/users")
        .send(userInfo);
        const errors = res.body.errors || [];
        const newErrors = getErrors(errors);
        const errorIndex = newErrors.indexOf("email is empty");
        expect(errorIndex).toBeGreaterThan(-1);
        return Promise.resolve();
    });
    it("should test name is empty", async () => {
        const userInfo = { email: `geekjc${randomId}@gamil.com`, name: "", password: "abc123456" };
        const res = await request(app).post("/users")
        .send(userInfo);
        const errors = res.body.errors || [];
        const newErrors = getErrors(errors);
        const errorIndex = newErrors.indexOf("name is empty");
        expect(errorIndex).toBeGreaterThan(-1);
        return Promise.resolve();
    });
    it("should test name got wrong length", async () => {
        const userInfo = { email: `geekjc${randomId}@gamil.com`, name: "te", password: "abc123456" };
        const res = await request(app).post("/users")
        .send(userInfo);
        const errors = res.body.errors || [];
        const newErrors = getErrors(errors);
        const errorIndex = newErrors.indexOf("must be at least 3-20 chars long");
        expect(errorIndex).toBeGreaterThan(-1);
        return Promise.resolve();
    });
    it("should test password is empty", async () => {
        const userInfo = { email: `geekjc${randomId}@gamil.com`, name: "test1", password: "" };
        const res = await request(app).post("/users")
        .send(userInfo);
        const errors = res.body.errors || [];
        const newErrors = getErrors(errors);
        const errorIndex = newErrors.indexOf("password is empty");
        expect(errorIndex).toBeGreaterThan(-1);
        return Promise.resolve();
    });
    it("should test password got wrong format", async () => {
        const userInfo = { email: `geekjc${randomId}@gamil.com`, name: "test1", password: "ABC" };
        const res = await request(app).post("/users")
        .send(userInfo);
        const errors = res.body.errors || [];
        const newErrors = getErrors(errors);
        let errorIndex = newErrors.indexOf("must be at least 6-16 chars long");
        if(errorIndex < 0) errorIndex = newErrors.indexOf("at least one lowercase word");
        if(errorIndex < 0) errorIndex = newErrors.indexOf("at least one number");
        expect(errorIndex).toBeGreaterThan(-1);
        return Promise.resolve();
    });
});
