import { CertificateService } from "./certificate.service.js";
import { ApiResponse, asyncHandler } from "../../shared/utils/api.utils.js";

/**
 * Generate and Issue a Certificate
 */
export const generateCertificate = asyncHandler(async (req, res) => {
  const certificate = await CertificateService.generateCertificate(req.params.enrollmentId);
  return res.status(201).json(new ApiResponse(201, certificate, "Certificate generated successfully"));
});

/**
 * Public Verification
 */
export const verifyCertificate = asyncHandler(async (req, res) => {
  const verificationData = await CertificateService.verifyCertificate(req.params.certificateNo);
  return res.status(200).json(new ApiResponse(200, verificationData, "Certificate verified"));
});

/**
 * Get student certificates
 */
export const getStudentCertificates = asyncHandler(async (req, res) => {
  const certificates = await CertificateService.getStudentCertificates(req.params.studentId);
  return res.status(200).json(new ApiResponse(200, certificates, "Certificates fetched"));
});

/**
 * Self-service: certificates for the logged-in student
 */
export const getMyCertificates = asyncHandler(async (req, res) => {
  const certificates = await CertificateService.getMyCertificates(req.user._id);
  return res.status(200).json(new ApiResponse(200, certificates, "My certificates fetched"));
});

/**
 * Download certificate
 */
export const downloadCertificate = asyncHandler(async (req, res) => {
  const result = await CertificateService.downloadCertificate(req.params.id);
  return res.status(200).json(new ApiResponse(200, result, "Download link fetched"));
});
