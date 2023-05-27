import { main } from "../../../src/functions/hello/handler";
import createMockContext from "aws-lambda-test-utils";
import eventMockBase from "../../mocks/eventMockBase";

describe("Given hello lambda function is called", () => {
  const context = createMockContext.mockContextCreator({}, () => {});

  describe("And body is provided correctly", () => {
    const event = {
      ...eventMockBase,
      body: { name: "Joe" },
    };
    

    let response: any = null;

    beforeEach(async () => {
      response = await main(event, context);
    });

    it("Then return response with a greeting message", () => {
      expect(response.body).toEqual(
        JSON.stringify({
          message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
        })
      );
    });

    it("Then return response with OK status", () => {
      expect(response.statusCode).toEqual(200);
    });
  });

  describe("And body is NOT provided correctly", () => {
    const event = {
      ...eventMockBase,
      body: {},
    };

    let response: any = null;

    beforeEach(async () => {
      response = await main(event, context);
    });

    it("Then return response with an error", () => {
      expect(response.body).toEqual(
        JSON.stringify({
          error: "Invalid request",
        })
      );
    });

    it("Then return response with Bad Request status", () => {
      expect(response.statusCode).toEqual(400);
    });
  });
});
