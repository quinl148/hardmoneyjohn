import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const body = await request.json()

  const {
    fundingType, applicationType, brokerFeeIncluded,
    firstName, middleInitial, lastName, suffix,
    email, phone, dateOfBirth,
    streetAddress, city, state, zip,
    companyName, companyState, borrowerType, maritalStatus, loanType, partnershipInfo, textUpdates,
    desiredClosingDate, propertyAddress, propertyCity, propertyState, propertyZip,
    estimatedRepairAmount, requestingRepairFunds, afterRepairValue, scopeOfWork,
    availableCash, creditScore, bankruptcyHistory, exitStrategy, ownPropertyFreeAndClear, investingExperience,
  } = body

  const html = `
    <h2 style="color:#1a1a1a;font-family:sans-serif;">New Deal Submission</h2>

    <h3 style="color:#2563eb;font-family:sans-serif;">Loan Request</h3>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%">
      <tr><td style="padding:4px 8px;color:#666;width:220px">Funding Type</td><td style="padding:4px 8px">${fundingType}</td></tr>
      <tr><td style="padding:4px 8px;color:#666">Application Type</td><td style="padding:4px 8px">${applicationType}</td></tr>
      ${applicationType === "broker" ? `<tr><td style="padding:4px 8px;color:#666">Broker Fee Included</td><td style="padding:4px 8px">${brokerFeeIncluded}</td></tr>` : ""}
    </table>

    <h3 style="color:#2563eb;font-family:sans-serif;">Borrower Information</h3>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%">
      <tr><td style="padding:4px 8px;color:#666;width:220px">Name</td><td style="padding:4px 8px">${firstName} ${middleInitial} ${lastName} ${suffix}</td></tr>
      <tr><td style="padding:4px 8px;color:#666">Email</td><td style="padding:4px 8px">${email}</td></tr>
      <tr><td style="padding:4px 8px;color:#666">Phone</td><td style="padding:4px 8px">${phone}</td></tr>
      <tr><td style="padding:4px 8px;color:#666">Date of Birth</td><td style="padding:4px 8px">${dateOfBirth}</td></tr>
      <tr><td style="padding:4px 8px;color:#666">Address</td><td style="padding:4px 8px">${streetAddress}, ${city}, ${state} ${zip}</td></tr>
      <tr><td style="padding:4px 8px;color:#666">Company</td><td style="padding:4px 8px">${companyName}</td></tr>
      <tr><td style="padding:4px 8px;color:#666">Company State</td><td style="padding:4px 8px">${companyState}</td></tr>
      <tr><td style="padding:4px 8px;color:#666">Borrower Type</td><td style="padding:4px 8px">${borrowerType}</td></tr>
      <tr><td style="padding:4px 8px;color:#666">Marital Status</td><td style="padding:4px 8px">${maritalStatus}</td></tr>
      <tr><td style="padding:4px 8px;color:#666">Loan Type</td><td style="padding:4px 8px">${loanType}</td></tr>
      <tr><td style="padding:4px 8px;color:#666">Text Updates</td><td style="padding:4px 8px">${textUpdates ? "Yes" : "No"}</td></tr>
      ${partnershipInfo ? `<tr><td style="padding:4px 8px;color:#666">Partnership Info</td><td style="padding:4px 8px">${partnershipInfo}</td></tr>` : ""}
    </table>

    <h3 style="color:#2563eb;font-family:sans-serif;">Property Details</h3>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%">
      <tr><td style="padding:4px 8px;color:#666;width:220px">Desired Closing</td><td style="padding:4px 8px">${desiredClosingDate}</td></tr>
      <tr><td style="padding:4px 8px;color:#666">Property Address</td><td style="padding:4px 8px">${propertyAddress}, ${propertyCity}, ${propertyState} ${propertyZip}</td></tr>
      <tr><td style="padding:4px 8px;color:#666">Estimated Repairs</td><td style="padding:4px 8px">${estimatedRepairAmount}</td></tr>
      <tr><td style="padding:4px 8px;color:#666">Requesting Repair Funds</td><td style="padding:4px 8px">${requestingRepairFunds}</td></tr>
      <tr><td style="padding:4px 8px;color:#666">ARV / As-Is Value</td><td style="padding:4px 8px">${afterRepairValue}</td></tr>
      <tr><td style="padding:4px 8px;color:#666">Scope of Work</td><td style="padding:4px 8px">${scopeOfWork}</td></tr>
    </table>

    <h3 style="color:#2563eb;font-family:sans-serif;">Supporting Information</h3>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%">
      <tr><td style="padding:4px 8px;color:#666;width:220px">Available Cash</td><td style="padding:4px 8px">${availableCash}</td></tr>
      <tr><td style="padding:4px 8px;color:#666">Credit Score</td><td style="padding:4px 8px">${creditScore}</td></tr>
      <tr><td style="padding:4px 8px;color:#666">Bankruptcy/Foreclosure (10yr)</td><td style="padding:4px 8px">${bankruptcyHistory}</td></tr>
      <tr><td style="padding:4px 8px;color:#666">Exit Strategy</td><td style="padding:4px 8px">${exitStrategy}</td></tr>
      <tr><td style="padding:4px 8px;color:#666">Own Property Free & Clear</td><td style="padding:4px 8px">${ownPropertyFreeAndClear}</td></tr>
      <tr><td style="padding:4px 8px;color:#666">Investing Experience</td><td style="padding:4px 8px">${investingExperience}</td></tr>
    </table>
  `

  try {
    await resend.emails.send({
      from: "Deal Submissions <onboarding@resend.dev>",
      to: "john@fstreet.com",
      replyTo: email,
      subject: `New Deal Submission — ${firstName} ${lastName} | ${propertyAddress || "No address provided"}`,
      html,
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Email send error:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
