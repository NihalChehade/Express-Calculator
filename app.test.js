const request = require("supertest");
const app = require("./app");

describe("Test the /mean route", () => {

    test("It should return the mean of the numbers", async () => {
      const response = await request(app).get("/mean?nums=1,2,3,4");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ operation: "mean", value: 2.5 });
    });
  
    test("It should return a 400 error for invalid input", async () => {
      const response = await request(app).get("/mean?nums=foo,2,3");
      expect(response.statusCode).toBe(400);
      expect(response.body.error.message).toBe("foo is not a number");
    });
  
    test("It should return a 400 error for missing nums", async () => {
      const response = await request(app).get("/mean");
      expect(response.statusCode).toBe(400);
      expect(response.body.error.message).toBe("Nums are required");
    });

  });
  
  describe("Test the /median route", () => {

    test("It should return the median of the numbers", async () => {
      const response = await request(app).get("/median?nums=1,2,3,4");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ operation: "median", value: 2.5 });
    });
  
    test("It should return a 400 error for invalid input", async () => {
      const response = await request(app).get("/median?nums=foo,2,3");
      expect(response.statusCode).toBe(400);
      expect(response.body.error.message).toBe("foo is not a number");
    });
  
    test("It should return a 400 error for missing nums", async () => {
      const response = await request(app).get("/median");
      expect(response.statusCode).toBe(400);
      expect(response.body.error.message).toBe("Nums are required");
    });

  });
  
  describe("Test the /mode route", () => {

    test("It should return the mode of the numbers", async () => {
      const response = await request(app).get("/mode?nums=1,2,2,3,4");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ operation: "mode", value: 2 });
    });
  
    test("It should return a 400 error for invalid input", async () => {
      const response = await request(app).get("/mode?nums=foo,2,3");
      expect(response.statusCode).toBe(400);
      expect(response.body.error.message).toBe("foo is not a number");
    });
  
    test("It should return a 400 error for missing nums", async () => {
      const response = await request(app).get("/mode");
      expect(response.statusCode).toBe(400);
      expect(response.body.error.message).toBe("Nums are required");
    });

  });