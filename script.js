const webhookURL = "https://discord.com/api/webhooks/1373493498182893609/zuhveOzKdNHZvgsJGZhqNyby4eTU9nd6ZtnQo6oJitLGjwR1G5HRddY3fC73ZRIINHg-";

const form = document.getElementById("orderForm");
const responseMessage = document.getElementById("responseMessage");

// صوت إرسال مدمج بصيغة base64
const sendSoundData = "data:audio/mp3;base64,SUQzAwAAAAAAFlRFTkMAAAANAAADSAAAAQAAAAAgAAAaAAAACgAAAAgAAAACAAACAAABAAgAAgAABAAQAAAABAAgAAAEAAABAAgAAAEAAABAAgAAAEAAA==";
const sendSound = new Audio(sendSoundData);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const description = document.getElementById("description").value.trim();

  if (!name || !email || !phone || !description) {
    responseMessage.style.color = "red";
    responseMessage.textContent = "يرجى ملء جميع الحقول!";
    return;
  }

  const data = {
    content: null,
    embeds: [
      {
        title: "طلب إنشاء لوغو جديد",
        color: 0x808080,
        fields: [
          { name: "الاسم", value: name, inline: true },
          { name: "البريد الإلكتروني", value: email, inline: true },
          { name: "رقم الهاتف", value: phone, inline: true },
          { name: "وصف الطلب", value: description, inline: false }
        ],
        timestamp: new Date().toISOString()
      }
    ]
  };

  fetch(webhookURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then((res) => {
      if (res.ok) {
        sendSound.play();
        responseMessage.style.color = "green";
        responseMessage.textContent = "شكراً لك، لقد تم استلام طلبك بنجاح. سيتم الرد عليك قريبًا، وشكرًا.";
        form.reset();
      } else {
        responseMessage.style.color = "red";
        responseMessage.textContent = "حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى.";
      }
    })
    .catch(() => {
      responseMessage.style.color = "red";
      responseMessage.textContent = "فشل الاتصال بالخادم. تحقق من اتصالك بالإنترنت.";
    });
});
