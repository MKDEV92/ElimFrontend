import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  FiDownload, FiFileText, FiDollarSign, FiPrinter,
  FiUser, FiShoppingCart, FiCheckCircle, FiClock, FiXCircle
} from "react-icons/fi";

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchPurchases = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/elimuis/api/purchases`);
      console.log("API response:", res.data);
      const data = Array.isArray(res.data) ? res.data : res.data.purchases || [];
      setPurchases(data);
    } catch (error) {
      console.error("Error fetching purchases:", error);
      setPurchases([]);
    } finally {
      setLoading(false);
    }
  };

  fetchPurchases();
}, []);


  const totalAmount = purchases.reduce((sum, p) => (p.status === "Success" ? sum + p.amount : sum), 0);
  const successCount = purchases.filter(p => p.status === "Success").length;
  const pendingCount = purchases.filter(p => p.status === "Pending").length;
  const failedCount = purchases.filter(p => p.status === "Failed").length;

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Elimu Platform - Purchases Report", 14, 16);
    autoTable(doc, {
      startY: 24,
      head: [["Student", "Material", "Amount", "Date", "Method", "Status", "M-Pesa Code"]],
      body: purchases.map(p => [
        p.studentName,
        p.materialTitle,
        `KSh ${p.amount}`,
        `${p.date} ${p.time || ""}`,
        p.method,
        p.status,
        p.mpesaCode,
      ]),
    });

    doc.save("purchases-report.pdf");
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      purchases.map(p => ({
        Student: p.studentName,
        Email: p.studentEmail,
        Material: p.materialTitle,
        Amount: p.amount,
        Date: `${p.date} ${p.time || ""}`,
        Method: p.method,
        Status: p.status,
        "M-Pesa Code": p.mpesaCode,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Purchases");

    const summarySheet = XLSX.utils.aoa_to_sheet([
      ["Total Revenue", totalAmount],
      ["Success Count", successCount],
      ["Pending Count", pendingCount],
      ["Failed Count", failedCount],
    ]);
    XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "purchases-report.xlsx");
  };

  const handlePrint = () => window.print();

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow border border-gray-200">
      <div className="bg-gray-900 px-6 py-4">
        <h2 className="text-xl font-bold text-white">Purchase Transactions</h2>
        <p className="text-emerald-300 text-sm">View and analyze all transactions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 border-b border-gray-200">
        <SummaryCard title="Total Revenue" value={`KSh ${totalAmount}`} icon={<FiDollarSign />} color="emerald" />
        <SummaryCard title="Successful" value={successCount} icon={<FiCheckCircle />} color="green" />
        <SummaryCard title="Pending" value={pendingCount} icon={<FiClock />} color="yellow" />
        <SummaryCard title="Failed" value={failedCount} icon={<FiXCircle />} color="red" />
      </div>

      <div className="flex justify-between items-center px-6 py-4 border-b">
        <div>
          <h3 className="font-semibold text-gray-900">Recent Transactions</h3>
          <p className="text-sm text-gray-500">{purchases.length} records</p>
        </div>
        <div className="flex gap-2">
          <ExportButton onClick={handleExportExcel} icon={<FiDownload />} label="Export Excel" />
          <ExportButton onClick={handleExportPDF} icon={<FiFileText />} label="Export PDF" />
          <ExportButton onClick={handlePrint} icon={<FiPrinter />} label="Print" outline />
        </div>
      </div>

      {loading ? (
        <div className="p-6 text-center text-gray-500">Loading purchases...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Student", "Material", "Amount", "Date", "Payment Info", "Status"].map((head) => (
                  <th key={head} className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {purchases.map((p, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-emerald-100 rounded-full p-2 text-emerald-600"><FiUser /></div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{p.studentName}</div>
                        <div className="text-xs text-gray-500">{p.studentEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{p.materialTitle}</td>
                  <td className="px-6 py-4">KSh {p.amount}</td>
                  <td className="px-6 py-4">{p.date} <div className="text-xs text-gray-400">{p.time}</div></td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <FiShoppingCart className="text-purple-600" /> {p.method}
                    </div>
                    <div className="text-xs text-gray-500">Ref: {p.mpesaCode}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      p.status === "Success" ? "bg-green-100 text-green-800" :
                      p.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const SummaryCard = ({ title, value, icon, color }) => (
  <div className={`bg-${color}-50 p-4 rounded-lg border border-${color}-100`}>
    <div className="flex justify-between items-center">
      <div>
        <p className={`text-sm text-${color}-700`}>{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
      </div>
      <div className={`bg-${color}-100 p-3 rounded-full`}>
        {React.cloneElement(icon, { className: `h-6 w-6 text-${color}-600` })}
      </div>
    </div>
  </div>
);

const ExportButton = ({ onClick, icon, label, outline }) => (
  <button
    onClick={onClick}
    className={`flex items-center px-4 py-2.5 rounded-md text-sm transition ${
      outline
        ? "border border-gray-300 text-gray-700 hover:bg-gray-50"
        : "bg-emerald-600 hover:bg-emerald-700 text-white"
    }`}
  >
    {icon && <span className="mr-2">{icon}</span>}
    {label}
  </button>
);

export default Purchases;
