import { Inquiry } from "./models/inquiry.model.js";
import { Testimonial } from "./models/testimonial.model.js";
import { Gallery } from "./models/gallery.model.js";
import { Franchise } from "../franchise/franchise.model.js";
import { Course } from "../course/course.model.js";

export class InquiryService {
  static async submit(data) {
    return Inquiry.create(data);
  }
}

export class TestimonialService {
  static async getApproved() {
    return Testimonial.find({ isApproved: true });
  }
}

export class GalleryService {
  static async getAll() {
    return Gallery.find().sort({ createdAt: -1 });
  }
}

/**
 * Public read-only catalogue endpoints (courses/franchises) that don't
 * belong to Inquiry/Testimonial/Gallery but still live under the shared
 * `/api/v1/public` route surface. Certificate verification lives in the
 * certificate module (CertificateService.verifyCertificate) — not here,
 * to avoid the duplicate/broken handler this module used to have.
 */
export class PublicCatalogService {
  static async getPublicCourses() {
    return Course.find({ isActive: true, franchiseId: null });
  }

  static async getPublicFranchises() {
    return Franchise.find({ status: "active" }).select("name _id");
  }
}
