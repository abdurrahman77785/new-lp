document.getElementById("order-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const submitBtn = document.getElementById("submit-btn");
  const btnText = submitBtn.querySelector(".btn-text");
  const spinner = submitBtn.querySelector(".loading-spinner");

  // Tampilkan loading state
  btnText.textContent = "Memproses...";
  spinner.style.display = "inline-block";
  submitBtn.disabled = true;

  try {
    // Ambil nilai dari input form
    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();
    const websiteType = document.getElementById("website-type")?.value.trim();
    const domain = document.getElementById("domain")?.value.trim();
    const notes = document.getElementById("notes")?.value.trim();
    const adminNumber = document.getElementById("admin-wa")?.value.trim();

    const selectedPackage = document.querySelector('input[name="package"]:checked')?.value || 'Belum dipilih';

    // Validasi sederhana (opsional)
    if (!name || !phone || !adminNumber) {
      alert("Nama, nomor WA, dan admin WA wajib diisi.");
      throw new Error("Field wajib tidak diisi");
    }

    // Simpan data ke localStorage
    const orderData = {
      name,
      email,
      phone,
      website_type: websiteType,
      package: selectedPackage,
      domain,
      notes,
      date: new Date().toISOString()
    };
    localStorage.setItem('lastOrder', JSON.stringify(orderData));

    // Format pesan WhatsApp
    const message = 
      `*Pemesanan Website Baru*%0A` +
      `Nama: ${name}%0A` +
      `Email: ${email}%0A` +
      `No. WA: ${phone}%0A` +
      `Jenis Website: ${websiteType}%0A` +
      `Paket: ${selectedPackage}%0A` +
      `Domain: ${domain}%0A` +
      `Catatan: ${notes || '-'}`;

    // Kirim ke WhatsApp
    window.open(`https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`, "_blank");

  } catch (error) {
    console.error("Terjadi kesalahan:", error.message);
    alert("Terjadi kesalahan saat mengirim data. Silakan coba lagi.");
  } finally {
    // Reset tombol
    btnText.textContent = "Kirim via WhatsApp";
    spinner.style.display = "none";
    submitBtn.disabled = false;
  }
});
