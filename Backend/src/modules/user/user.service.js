import { User } from "./user.model.js";
import { ApiError } from "../../shared/utils/api.utils.js";

/**
 * Shared read helpers for the User collection, used by auth.service.js and
 * student.service.js (admission-time account linking). No controller/route
 * — user CRUD/auth flows live entirely in the auth module.
 */
export class UserService {
  static async findById(id) {
    return User.findById(id);
  }

  static async findByEmailOrPhone({ email, phone }) {
    return User.findOne({ $or: [{ email }, { phone }] });
  }

  static async existsByEmailOrPhone({ email, phone }) {
    const user = await UserService.findByEmailOrPhone({ email, phone });
    return !!user;
  }

  static async getCurrentUser(userId) {
    const user = await User.findById(userId).select("-password -refreshToken");
    if (!user) throw new ApiError(404, "User not found");
    return user;
  }
}
