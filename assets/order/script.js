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
    // Ambil nilai form
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const websiteType = document.getElementById("website-type").value;
    const domain = document.getElementById("domain").value;
    const notes = document.getElementById("notes").value;
    const adminNumber = document.getElementById("admin-wa").value;
    
    // Ambil paket yang dipilih
    const package = document.querySelector('input[name="package"]:checked')?.value || 'Belum dipilih';
    
    // Simpan data ke localStorage untuk halaman thank-you
    const orderData = {
      name,
      email,
      phone,
      website_type: websiteType,
      package,
      domain,
      notes,
      date: new Date().toISOString()
    };
    localStorage.setItem('lastOrder', JSON.stringify(orderData));
    
    // Buat pesan WhatsApp
    const message = `*Pemesanan Website Baru*%0A` +
      `Nama: ${name}%0A` +
      `Email: ${email}%0A` +
      `No. WA: ${phone}%0A` +
      `Jenis Website: ${websiteType}%0A` +
      `Paket: ${package}%0A` +
      `Domain: ${domain}%0A` +
      `Catatan: ${notes || '-'}`;
    
    // Kirim ke WhatsApp
    window.open(`https://wa.me/${adminNumber}?text=${message}`, "_blank");
    
    // Kirim ke Google Sheets
    const response = await fetch("https://script.google.com/macros/s/AKfycbxV0pE0PCl_piF4xwtOA4_CO4Zyee3pXyWq7VL-BsUQrH2rgnzG4yFEj4HS44KrLAo5/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    
    if (response.ok) {
      // Tampilkan pesan sukses
      document.getElementById("success-message").style.display = "block";
      document.getElementById("order-form").reset();
      
      // Redirect ke halaman thank-you setelah 2 detik
      setTimeout(() => {
        window.location.href = "thank-you.html";
      }, 2000);
    } else {
      throw new Error("Gagal mengirim data");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Terjadi kesalahan: " + error.message);
  } finally {
    // Reset button state
    btnText.textContent = "Kirim via WhatsApp";
    spinner.style.display = "none";
    submitBtn.disabled = false;
  }
});