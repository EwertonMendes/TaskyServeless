import { main } from "../../../src/functions/hello/handler";
import createMockContext from "aws-lambda-test-utils";
import eventMockBase from "../../mocks/eventMockBase";

describe("Given hello lambda function is called", () => {
  describe("And body is provided correctly", () => {
    it("Then return response with a greeting message", async () => {
      const event = {
        ...eventMockBase,
        body: { name: "John" },
      };

      const context = createMockContext.mockContextCreator({}, () => {});

      const response = await main(event, context);
      
      expect(response.body).toEqual(
        JSON.stringify({
          message: "Hello John, welcome to the exciting Serverless world!",
        })
      );
    });

    it("Then return response with a greeting message", async () => {
      const event = {
        ...eventMockBase,
        body: { name: "John" },
      };

      const context = createMockContext.mockContextCreator({}, () => {});

      const response = await main(event, context);

      expect(response.statusCode).toEqual(200);
    });
  });
});
