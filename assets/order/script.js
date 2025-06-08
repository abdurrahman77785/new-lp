document.getElementById("order-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const websiteType = document.getElementById("website-type").value;
  const package = document.getElementById("package").value;
  const domain = document.getElementById("domain").value;
  const notes = document.getElementById("notes").value;
  const coupon = document.getElementById("coupon").value;
  const adminNumber = document.getElementById("admin-wa").value;

  const message = `*Pemesanan Website Baru*%0A
Nama: ${name}%0A
Email: ${email}%0A
No. WA: ${phone}%0A
Jenis Website: ${websiteType}%0A
Paket: ${package}%0A
Domain: ${domain}%0A
Catatan: ${notes || '-'}%0A
Kode Kupon: ${coupon || '-'}`;

  // Kirim ke WhatsApp
  window.open(`https://wa.me/${adminNumber}?text=${message}`, "_blank");

  // Kirim ke Spreadsheet
  fetch("https://script.google.com/macros/s/AKfycbz_k6eutDcFpVZZZcWbiD9PmdMh50SLmAnfXRIKQUDd0A-J_duq4lEJYddT-7KV5q8I/exec", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      phone,
      websiteType,
      package,
      domain,
      notes,
      coupon
    }),
  })
    .then((res) => {
      if (res.ok) {
        document.getElementById("order-form").reset();
        document.getElementById("success-message").style.display = "block";
      } else {
        alert("Gagal mengirim data ke Spreadsheet.");
      }
    })
    .catch((err) => {
      console.error("ERROR:", err);
    });
});
