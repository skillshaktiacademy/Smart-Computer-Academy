import { Notice } from "./notice.model.js";
import { Student } from "../student/student.model.js";
import { ROLES } from "../../shared/constants/roles.js";
import { NotificationService } from "../../shared/services/notification.service.js";
import logger from "../../shared/utils/logger.js";

export class NoticeService {
  /**
   * Creates a notice and (fire-and-forget) emails affected students —
   * global notices reach everyone, franchise-scoped notices reach only
   * that franchise's students, matching the same audience the notice
   * itself targets.
   */
  static async createNotice({ title, content, targetRoles }, requestingUser) {
    const franchiseId = requestingUser.role === ROLES.SUPER_ADMIN ? null : requestingUser.franchiseId;
    const notice = await Notice.create({ title, content, targetRoles, franchiseId });

    if (!targetRoles || targetRoles.includes("all") || targetRoles.includes(ROLES.STUDENT)) {
      const studentQuery = franchiseId ? { franchiseId, isActive: true } : { isActive: true };
      Student.find(studentQuery)
        .then((students) => {
          students.forEach((student) => {
            NotificationService.notifyNoticePosted(student, title).catch((err) =>
              logger.error(`Notice-posted notification failed: ${err.message}`)
            );
          });
        })
        .catch((err) => logger.error(`Notice recipient lookup failed: ${err.message}`));
    }

    return notice;
  }

  static async getMyNotices(requestingUser) {
    const query = {
      isActive: true,
      $or: [{ targetRoles: "all" }, { targetRoles: requestingUser.role }],
      $and: [{ $or: [{ franchiseId: null }, { franchiseId: requestingUser.franchiseId }] }],
    };

    return Notice.find(query).sort({ createdAt: -1 });
  }
}
