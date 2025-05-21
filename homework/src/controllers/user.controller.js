import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { DuplicateUserEmailError } from "../errors.js"; // 필요 시 사용자 정의 에러 가져오기

export const handleUserSignUp = async (req, res, next) => {
  /*
    #swagger.summary = '회원 가입 API'
    #swagger.tags = ['User']
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/SignUpRequest" }
        }
      }
    }
    #swagger.responses[200] = {
      description: "회원 가입 성공 응답",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/SignUpSuccessResponse" }
        }
      }
    }
    #swagger.responses[400] = {
      description: "회원 가입 실패 응답",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/SignUpFailResponse" }
        }
      }
    }
  */

  try {
    const user = await userSignUp(bodyToUser(req.body));
    res.status(StatusCodes.OK).success(user);
  } catch (err) {
    // 커스텀 에러 처리
    if (err instanceof DuplicateUserEmailError) {
      res.status(StatusCodes.BAD_REQUEST).error({
        errorCode: err.errorCode,
        reason: err.reason,
        data: err.data || null
      });
    } else {
      // 예외 처리 미정의 시 next로 전달
      next(err);
    }
  }
};