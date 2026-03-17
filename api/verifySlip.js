export default async function handler(req, res) {

  const { slip_image, user_id } = req.body

  const r = await fetch("https://developer.easyslip.com/api/v1/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.EASYSLIP_API_KEY}`
    },
    body: JSON.stringify({
      slip_image: slip_image
    })
  })

  const data = await r.json()

  // ✅ ตรวจเงิน
  if (data?.data?.amount == 199 &&
  data.data.receiver.name.includes("พีระพัฒน์")

    // 👉 สร้าง KEY อัตโนมัติ
    const keyRes = await fetch(`${process.env.BASE_URL}/api/createKey`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: user_id
      })
    })

    const keyData = await keyRes.json()

    return res.json({
      success: true,
      key: keyData.key,
      amount: data.data.amount
    })
  }

  res.json({ success: false })

}
