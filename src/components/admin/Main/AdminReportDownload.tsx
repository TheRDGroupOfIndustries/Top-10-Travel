"use client";
import { ReportData } from "@/app/(admin)/admin/report/page";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const AdminReportDownload = ({ report }: { report: ReportData }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    const margin = { top: 10, left: 10, right: 10 };
    const lineHeight = 10;
    let y = margin.top;

    // Title
    doc.setFontSize(18);
    doc.text("Admin Report", margin.left, y);
    y += lineHeight; // Space after title

    // Total Listings
    doc.setFontSize(12);
    doc.text(`Total Listings: ${report.length}`, margin.left, y);
    y += lineHeight * 2; // Space after total listings

    // Company Details
    report.forEach((company, index) => {
      if (index > 0) {
        // Add a new page for every company except the first one
        doc.addPage();
        y = margin.top; // Reset y position for the new page
      }

      // Company Header
      doc.setFontSize(14);
      doc.text(` ${index + 1}. ${company.legalName}`, margin.left, y);
      y += lineHeight;

      doc.setFontSize(10);
      doc.text(`Total reviews: ${company.reviews}`, margin.left, y);
      doc.text(`Rating: ${company.rating.toFixed(1)}`, margin.left + 80, y); // Adjusted for spacing
      y += lineHeight;
      doc.text(`Country Priority: ${company.priority}`, margin.left, y);
      doc.text(`City Priority: ${company.state_priority}`, margin.left + 80, y); // Adjusted for spacing
      y += lineHeight;
      doc.text(`Country: ${company.country}`, margin.left, y);
      doc.text(`City: ${company.city}`, margin.left + 80, y); // Adjusted for spacing
      y += lineHeight * 2; // Space after company details

      // Add company reviews table
      autoTable(doc, {
        head: [["Review Id", "Name", "Review", "Created At"]],
        body: company.company_reviews.map((review) => [
          review.id,
          review.name,
          review.review,
          review.createdAt
            ? new Date(review.createdAt).toLocaleDateString()
            : "",
        ]),
        startY: y,
        margin: { left: margin.left, right: margin.right },
        theme: "grid",
        headStyles: { fillColor: [0, 0, 0] },
        alternateRowStyles: { fillColor: [240, 240, 240] },
        styles: { fontSize: 10 },
        pageBreak: "auto", // Automatically handle page breaks
      });
      // @ts-expect-error
      y = doc.autoTable.previous.finalY + 10; // Update y position after table
    });

    doc.save("admin_report.pdf");
  };
  return (
    <Button
      onClick={generatePDF}
      className="bg-[#fcaf1e] hover:bg-[#fcaf1e]/80"
    >
      Download pdf
    </Button>
  );
};
export default AdminReportDownload;
