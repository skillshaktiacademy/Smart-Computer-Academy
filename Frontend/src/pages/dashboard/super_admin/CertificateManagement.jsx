import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Award, Search, Filter, ShieldCheck, 
  ShieldAlert, Printer, Download, Eye,
  Loader2, Calendar, User, BookOpen,
  CheckCircle2, XCircle
} from "lucide-react";
import { adminAPI } from "../../../api/admin.api";
import DataTable from "../../../components/ui/DataTable";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import { toast } from "react-toastify";

const CertificateManagement = () => {
  const [confirmRevoke, setConfirmRevoke] = useState({ isOpen: false });
  const queryClient = useQueryClient();

  const { data: certsData, isLoading } = useQuery({
    queryKey: ["all-certificates"],
    queryFn: adminAPI.getAllCertificates,
  });

  const certificates = certsData?.data?.data || [];

  const revokeMutation = useMutation({
    mutationFn: (id) => api.patch(`/certificates/${id}/revoke`),
    onSuccess: () => {
      queryClient.invalidateQueries(["all-certificates"]);
      toast.success("Certificate revoked successfully.");
      setConfirmRevoke({ isOpen: false });
    },
    onError: () => toast.error("Failed to revoke certificate.")
  });

  const columns = [
    { 
      key: "certificateNo", 
      label: "Cert. No", 
      sortable: true,
      render: (val) => <span className="font-black text-primary uppercase tracking-tighter">{val}</span>
    },
    { 
      key: "studentId", 
      label: "Student",
      render: (val) => (
        <div>
          <p className="font-bold text-gray-900">{val?.name}</p>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{val?.enrollmentNo}</p>
        </div>
      )
    },
    { 
      key: "courseId", 
      label: "Course",
      render: (val) => <span className="text-xs font-black text-gray-500 uppercase">{val?.title}</span>
    },
    { 
      key: "issueDate", 
      label: "Issued On",
      render: (val) => <span className="text-sm font-medium text-gray-600">{new Date(val).toLocaleDateString()}</span>
    },
    { 
      key: "isRevoked", 
      label: "Status",
      render: (val) => (
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
          !val ? "bg-success/10 text-success" : "bg-error/10 text-error"
        }`}>
          {!val ? "Valid" : "Revoked"}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Certificate Registry</h1>
          <p className="text-gray-500 font-medium">Verify and manage all issued academic credentials.</p>
        </div>
        <div className="flex gap-4">
          <button className="btn-primary py-3 px-6 flex items-center gap-2">
            <Award size={20} />
            <span>Bulk Generate</span>
          </button>
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={certificates} 
        isLoading={isLoading}
        actions={(row) => (
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
              <Download size={18} />
            </button>
            {!row.isRevoked && (
              <button 
                onClick={() => setConfirmRevoke({ 
                  isOpen: true, 
                  id: row._id,
                  name: row.studentId?.name 
                })}
                className="p-2 text-gray-400 hover:text-error hover:bg-error/5 rounded-lg transition-all"
              >
                <ShieldAlert size={18} />
              </button>
            )}
          </div>
        )}
      />

      <ConfirmDialog 
        isOpen={confirmRevoke.isOpen}
        onClose={() => setConfirmRevoke({ isOpen: false })}
        onConfirm={() => revokeMutation.mutate(confirmRevoke.id)}
        title="Revoke Certificate?"
        message={`Are you sure you want to revoke the certificate for ${confirmRevoke.name}? This action will mark the certificate as invalid in the public verification portal.`}
        confirmLabel="Revoke Now"
        confirmColor="bg-error"
        isLoading={revokeMutation.isLoading}
      />
    </div>
  );
};

export default CertificateManagement;
