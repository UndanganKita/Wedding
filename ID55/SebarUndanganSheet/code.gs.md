function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Undangan"); // Ganti dengan nama sheet Anda
  const params = e.parameter;

  // Tambahkan data ke baris baru
  sheet.appendRow([
    params.Nama_Tujuan || "",
    params.Pengantin || "",  
    params.Waktu || ""
  ]);

  return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Undangan"); // Ganti dengan nama sheet Anda
  const data = sheet.getDataRange().getValues();
  
  // Buat objek JSON untuk setiap baris data
  const result = data.slice(1).map(row => ({
    Nama_Tujuan: row[0],
    Pengantin: row[1],
    Waktu: row[2]
  }));

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}
