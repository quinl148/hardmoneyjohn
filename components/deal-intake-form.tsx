"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight, ArrowLeft, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const US_STATES = [
  "Alabama", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "Florida", "Georgia", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
  "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
  "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia",
  "Washington", "West Virginia", "Wisconsin", "Wyoming"
]

interface FormData {
  // Step 1
  confirmInvestmentLoan: boolean
  fundingType: string
  // Step 2
  applicationType: string
  brokerFeeIncluded: string
  // Step 3
  firstName: string
  middleInitial: string
  lastName: string
  suffix: string
  email: string
  phone: string
  dateOfBirth: string
  streetAddress: string
  city: string
  state: string
  zip: string
  companyName: string
  sameAsResidence: boolean
  companyState: string
  partnershipInfo: string
  borrowerType: string
  maritalStatus: string
  textUpdates: boolean
  loanType: string
  // Step 4
  desiredClosingDate: string
  propertyAddress: string
  propertyCity: string
  propertyState: string
  propertyZip: string
  estimatedRepairAmount: string
  requestingRepairFunds: string
  afterRepairValue: string
  scopeOfWork: string
  // Step 5
  availableCash: string
  creditScore: string
  bankruptcyHistory: string
  exitStrategy: string
  ownPropertyFreeAndClear: string
  investingExperience: string
}

const initialFormData: FormData = {
  confirmInvestmentLoan: false,
  fundingType: "",
  applicationType: "",
  brokerFeeIncluded: "",
  firstName: "",
  middleInitial: "",
  lastName: "",
  suffix: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  streetAddress: "",
  city: "",
  state: "",
  zip: "",
  companyName: "",
  sameAsResidence: false,
  companyState: "",
  partnershipInfo: "",
  borrowerType: "",
  maritalStatus: "",
  textUpdates: false,
  loanType: "",
  desiredClosingDate: "",
  propertyAddress: "",
  propertyCity: "",
  propertyState: "",
  propertyZip: "",
  estimatedRepairAmount: "",
  requestingRepairFunds: "",
  afterRepairValue: "",
  scopeOfWork: "",
  availableCash: "",
  creditScore: "",
  bankruptcyHistory: "",
  exitStrategy: "",
  ownPropertyFreeAndClear: "",
  investingExperience: "",
}

const stepTitles = [
  "Confirm Loan Request",
  "Borrower or Broker",
  "Borrower Information",
  "Property Details",
  "Supporting Information"
]

export function DealIntakeForm({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [disqualified, setDisqualified] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFundingTypeChange = (value: string) => {
    if (value === "personal" || value === "primary") {
      setDisqualified(true)
    } else {
      setDisqualified(false)
      updateField("fundingType", value)
    }
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.confirmInvestmentLoan && formData.fundingType && !disqualified
      case 2:
        return formData.applicationType && (formData.applicationType !== "broker" || formData.brokerFeeIncluded)
      case 3:
        return formData.firstName && formData.lastName && formData.email && formData.phone && formData.loanType
      case 4:
        return formData.propertyAddress && formData.propertyState && formData.requestingRepairFunds
      case 5:
        return formData.creditScore && formData.exitStrategy && formData.investingExperience
      default:
        return false
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Format the form data for email
    const emailBody = `
New Deal Submission

LOAN REQUEST
- Funding Type: ${formData.fundingType}
- Application Type: ${formData.applicationType}
${formData.applicationType === "broker" ? `- Broker Fee Included: ${formData.brokerFeeIncluded}` : ""}

BORROWER INFORMATION
- Name: ${formData.firstName} ${formData.middleInitial} ${formData.lastName} ${formData.suffix}
- Email: ${formData.email}
- Phone: ${formData.phone}
- DOB: ${formData.dateOfBirth}
- Address: ${formData.streetAddress}, ${formData.city}, ${formData.state} ${formData.zip}
- Company: ${formData.companyName}
- Company State: ${formData.companyState}
- Borrower Type: ${formData.borrowerType}
- Marital Status: ${formData.maritalStatus}
- Loan Type: ${formData.loanType}
- Text Updates: ${formData.textUpdates ? "Yes" : "No"}
${formData.partnershipInfo ? `- Partnership Info: ${formData.partnershipInfo}` : ""}

PROPERTY DETAILS
- Desired Closing: ${formData.desiredClosingDate}
- Property: ${formData.propertyAddress}, ${formData.propertyCity}, ${formData.propertyState} ${formData.propertyZip}
- Estimated Repairs: ${formData.estimatedRepairAmount}
- Requesting Repair Funds: ${formData.requestingRepairFunds}
- ARV / As-Is Value: ${formData.afterRepairValue}
- Scope of Work: ${formData.scopeOfWork}

SUPPORTING INFO
- Available Cash: ${formData.availableCash}
- Credit Score: ${formData.creditScore}
- Bankruptcy/Foreclosure (10yr): ${formData.bankruptcyHistory}
- Exit Strategy: ${formData.exitStrategy}
- Own Property Free & Clear: ${formData.ownPropertyFreeAndClear}
- Experience: ${formData.investingExperience}
    `.trim()

    await fetch("/api/submit-deal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
    
    setIsSubmitting(false)
    setSubmitted(true)
  }

  const resetForm = () => {
    setStep(1)
    setFormData(initialFormData)
    setDisqualified(false)
    setSubmitted(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-xl shadow-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-card border-b border-border p-6">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={20} />
            </button>
            
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-medium text-foreground mb-4">
              Submit a Deal
            </h2>
            
            {/* Progress indicator */}
            {!submitted && (
              <div className="flex items-center gap-2">
                {stepTitles.map((title, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                      step > index + 1 
                        ? "bg-primary text-primary-foreground" 
                        : step === index + 1 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted text-muted-foreground"
                    }`}>
                      {step > index + 1 ? <Check size={14} /> : index + 1}
                    </div>
                    {index < stepTitles.length - 1 && (
                      <div className={`w-8 h-0.5 mx-1 ${step > index + 1 ? "bg-primary" : "bg-muted"}`} />
                    )}
                  </div>
                ))}
              </div>
            )}
            {!submitted && (
              <p className="text-sm text-muted-foreground mt-2">Step {step}: {stepTitles[step - 1]}</p>
            )}
          </div>

          {/* Form Content */}
          <div className="p-6">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-medium text-foreground mb-4">
                  Deal Submitted!
                </h3>
                <p className="text-muted-foreground mb-8">
                  Thank you for submitting your deal. I&apos;ll review it and get back to you within 24 hours.
                </p>
                <Button onClick={resetForm} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Close
                </Button>
              </motion.div>
            ) : disqualified ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-8 h-8 text-destructive" />
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-medium text-foreground mb-4">
                  Not a Fit
                </h3>
                <p className="text-muted-foreground mb-8">
                  Unfortunately, we only fund investment property loans (non-owner occupied). Personal loans and primary residence loans are not available through this program.
                </p>
                <Button onClick={() => { setDisqualified(false); updateField("fundingType", "") }} variant="outline">
                  Go Back
                </Button>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Step 1: Confirm Loan Request */}
                  {step === 1 && (
                    <>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.confirmInvestmentLoan}
                          onChange={(e) => updateField("confirmInvestmentLoan", e.target.checked)}
                          className="mt-1 w-5 h-5 rounded border-border bg-muted accent-primary"
                        />
                        <span className="text-foreground">
                          I confirm I am applying for a real estate investment loan (non-owner occupied)
                        </span>
                      </label>

                      <div className="space-y-3">
                        <p className="text-sm font-medium text-foreground">What are you requesting funding for?</p>
                        {[
                          { value: "investment", label: "Investment Property" },
                          { value: "wholesale", label: "Wholesale Purchase" },
                          { value: "personal", label: "Personal Loan" },
                          { value: "primary", label: "Primary Residence" },
                        ].map((option) => (
                          <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name="fundingType"
                              value={option.value}
                              checked={formData.fundingType === option.value}
                              onChange={() => handleFundingTypeChange(option.value)}
                              className="w-5 h-5 border-border bg-muted accent-primary"
                            />
                            <span className="text-foreground">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Step 2: Borrower or Broker */}
                  {step === 2 && (
                    <>
                      <div className="space-y-3">
                        <p className="text-sm font-medium text-foreground">Application Type</p>
                        {[
                          { value: "borrower", label: "I'm a Borrower" },
                          { value: "broker", label: "I'm a Broker" },
                        ].map((option) => (
                          <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name="applicationType"
                              value={option.value}
                              checked={formData.applicationType === option.value}
                              onChange={() => updateField("applicationType", option.value)}
                              className="w-5 h-5 border-border bg-muted accent-primary"
                            />
                            <span className="text-foreground">{option.label}</span>
                          </label>
                        ))}
                      </div>

                      {formData.applicationType === "broker" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="space-y-3"
                        >
                          <p className="text-sm font-medium text-foreground">Will a fee be included?</p>
                          {[
                            { value: "yes", label: "Yes" },
                            { value: "no", label: "No" },
                            { value: "na", label: "Not Applicable" },
                          ].map((option) => (
                            <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                              <input
                                type="radio"
                                name="brokerFee"
                                value={option.value}
                                checked={formData.brokerFeeIncluded === option.value}
                                onChange={() => updateField("brokerFeeIncluded", option.value)}
                                className="w-5 h-5 border-border bg-muted accent-primary"
                              />
                              <span className="text-foreground">{option.label}</span>
                            </label>
                          ))}
                        </motion.div>
                      )}
                    </>
                  )}

                  {/* Step 3: Borrower Information */}
                  {step === 3 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <input
                          type="text"
                          placeholder="First Name *"
                          value={formData.firstName}
                          onChange={(e) => updateField("firstName", e.target.value)}
                          className="col-span-2 sm:col-span-1 px-4 py-3 bg-muted border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <input
                          type="text"
                          placeholder="M.I."
                          value={formData.middleInitial}
                          onChange={(e) => updateField("middleInitial", e.target.value)}
                          className="px-4 py-3 bg-muted border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <input
                          type="text"
                          placeholder="Last Name *"
                          value={formData.lastName}
                          onChange={(e) => updateField("lastName", e.target.value)}
                          className="px-4 py-3 bg-muted border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <input
                          type="text"
                          placeholder="Suffix"
                          value={formData.suffix}
                          onChange={(e) => updateField("suffix", e.target.value)}
                          className="px-4 py-3 bg-muted border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <input
                          type="email"
                          placeholder="Email *"
                          value={formData.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          className="px-4 py-3 bg-muted border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <input
                          type="tel"
                          placeholder="Phone *"
                          value={formData.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                          className="px-4 py-3 bg-muted border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <input
                        type="date"
                        placeholder="Date of Birth"
                        value={formData.dateOfBirth}
                        onChange={(e) => updateField("dateOfBirth", e.target.value)}
                        className="w-full px-4 py-3 bg-muted border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />

                      <p className="text-sm font-medium text-foreground pt-2">Primary Residence</p>
                      <input
                        type="text"
                        placeholder="Street Address"
                        value={formData.streetAddress}
                        onChange={(e) => updateField("streetAddress", e.target.value)}
                        className="w-full px-4 py-3 bg-muted border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <div className="grid sm:grid-cols-3 gap-4">
                        <input
                          type="text"
                          placeholder="City"
                          value={formData.city}
                          onChange={(e) => updateField("city", e.target.value)}
                          className="px-4 py-3 bg-muted border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <select
                          value={formData.state}
                          onChange={(e) => updateField("state", e.target.value)}
                          className="px-4 py-3 bg-muted border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">State</option>
                          {US_STATES.map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                        <input
                          type="text"
                          placeholder="Zip"
                          value={formData.zip}
                          onChange={(e) => updateField("zip", e.target.value)}
                          className="px-4 py-3 bg-muted border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <input
                        type="text"
                        placeholder="Company Name"
                        value={formData.companyName}
                        onChange={(e) => updateField("companyName", e.target.value)}
                        className="w-full px-4 py-3 bg-muted border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.sameAsResidence}
                          onChange={(e) => updateField("sameAsResidence", e.target.checked)}
                          className="w-5 h-5 rounded border-border bg-muted accent-primary"
                        />
                        <span className="text-foreground text-sm">My company address is the same as my primary residence</span>
                      </label>

                      <select
                        value={formData.companyState}
                        onChange={(e) => updateField("companyState", e.target.value)}
                        className="w-full px-4 py-3 bg-muted border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Company State Registration</option>
                        {US_STATES.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>

                      <textarea
                        placeholder="If Partnership, provide full name, address, email, phone, DOB for each partner"
                        value={formData.partnershipInfo}
                        onChange={(e) => updateField("partnershipInfo", e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 bg-muted border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      />

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <p className="text-sm font-medium text-foreground">Borrower Type</p>
                          {["New Borrower", "Returning Borrower"].map((option) => (
                            <label key={option} className="flex items-center gap-3 cursor-pointer">
                              <input
                                type="radio"
                                name="borrowerType"
                                value={option}
                                checked={formData.borrowerType === option}
                                onChange={() => updateField("borrowerType", option)}
                                className="w-5 h-5 border-border bg-muted accent-primary"
                              />
                              <span className="text-foreground text-sm">{option}</span>
                            </label>
                          ))}
                        </div>

                        <div className="space-y-3">
                          <p className="text-sm font-medium text-foreground">Marital Status</p>
                          {["Single", "Married"].map((option) => (
                            <label key={option} className="flex items-center gap-3 cursor-pointer">
                              <input
                                type="radio"
                                name="maritalStatus"
                                value={option}
                                checked={formData.maritalStatus === option}
                                onChange={() => updateField("maritalStatus", option)}
                                className="w-5 h-5 border-border bg-muted accent-primary"
                              />
                              <span className="text-foreground text-sm">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.textUpdates}
                          onChange={(e) => updateField("textUpdates", e.target.checked)}
                          className="w-5 h-5 rounded border-border bg-muted accent-primary"
                        />
                        <span className="text-foreground text-sm">I&apos;d like to receive text message updates</span>
                      </label>

                      <div className="space-y-3">
                        <p className="text-sm font-medium text-foreground">Type of Loan *</p>
                        {["Purchase", "Refinance"].map((option) => (
                          <label key={option} className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name="loanType"
                              value={option}
                              checked={formData.loanType === option}
                              onChange={() => updateField("loanType", option)}
                              className="w-5 h-5 border-border bg-muted accent-primary"
                            />
                            <span className="text-foreground text-sm">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 4: Property Details */}
                  {step === 4 && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Desired Closing Date</label>
                        <input
                          type="date"
                          value={formData.desiredClosingDate}
                          onChange={(e) => updateField("desiredClosingDate", e.target.value)}
                          className="w-full px-4 py-3 bg-muted border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <p className="text-sm font-medium text-foreground pt-2">Subject Property Address *</p>
                      <input
                        type="text"
                        placeholder="Street Address"
                        value={formData.propertyAddress}
                        onChange={(e) => updateField("propertyAddress", e.target.value)}
                        className="w-full px-4 py-3 bg-muted border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <div className="grid sm:grid-cols-3 gap-4">
                        <input
                          type="text"
                          placeholder="City"
                          value={formData.propertyCity}
                          onChange={(e) => updateField("propertyCity", e.target.value)}
                          className="px-4 py-3 bg-muted border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <select
                          value={formData.propertyState}
                          onChange={(e) => updateField("propertyState", e.target.value)}
                          className="px-4 py-3 bg-muted border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">State *</option>
                          {US_STATES.map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                        <input
                          type="text"
                          placeholder="Zip"
                          value={formData.propertyZip}
                          onChange={(e) => updateField("propertyZip", e.target.value)}
                          className="px-4 py-3 bg-muted border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <input
                        type="text"
                        placeholder="Estimated Repair Amount ($)"
                        value={formData.estimatedRepairAmount}
                        onChange={(e) => updateField("estimatedRepairAmount", e.target.value)}
                        className="w-full px-4 py-3 bg-muted border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />

                      <div className="space-y-3">
                        <p className="text-sm font-medium text-foreground">Requesting Repair Funds? *</p>
                        {["Yes", "No"].map((option) => (
                          <label key={option} className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name="repairFunds"
                              value={option}
                              checked={formData.requestingRepairFunds === option}
                              onChange={() => updateField("requestingRepairFunds", option)}
                              className="w-5 h-5 border-border bg-muted accent-primary"
                            />
                            <span className="text-foreground text-sm">{option}</span>
                          </label>
                        ))}
                      </div>

                      <input
                        type="text"
                        placeholder="After Repair Value (or As-Is Value if no repairs)"
                        value={formData.afterRepairValue}
                        onChange={(e) => updateField("afterRepairValue", e.target.value)}
                        className="w-full px-4 py-3 bg-muted border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />

                      <textarea
                        placeholder="Brief Description of Scope of Work"
                        value={formData.scopeOfWork}
                        onChange={(e) => updateField("scopeOfWork", e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 bg-muted border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      />
                    </div>
                  )}

                  {/* Step 5: Supporting Information */}
                  {step === 5 && (
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Available Cash ($)"
                        value={formData.availableCash}
                        onChange={(e) => updateField("availableCash", e.target.value)}
                        className="w-full px-4 py-3 bg-muted border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />

                      <input
                        type="number"
                        placeholder="Current Credit Score *"
                        value={formData.creditScore}
                        onChange={(e) => updateField("creditScore", e.target.value)}
                        className="w-full px-4 py-3 bg-muted border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />

                      <div className="space-y-3">
                        <p className="text-sm font-medium text-foreground">Bankruptcy/eviction/foreclosure in past 10 years?</p>
                        {["No", "Yes"].map((option) => (
                          <label key={option} className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name="bankruptcy"
                              value={option}
                              checked={formData.bankruptcyHistory === option}
                              onChange={() => updateField("bankruptcyHistory", option)}
                              className="w-5 h-5 border-border bg-muted accent-primary"
                            />
                            <span className="text-foreground text-sm">{option}</span>
                          </label>
                        ))}
                      </div>

                      <div className="space-y-3">
                        <p className="text-sm font-medium text-foreground">Exit Strategy *</p>
                        {["Sell (Fix & Flip)", "Hold and Refinance"].map((option) => (
                          <label key={option} className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name="exitStrategy"
                              value={option}
                              checked={formData.exitStrategy === option}
                              onChange={() => updateField("exitStrategy", option)}
                              className="w-5 h-5 border-border bg-muted accent-primary"
                            />
                            <span className="text-foreground text-sm">{option}</span>
                          </label>
                        ))}
                      </div>

                      <div className="space-y-3">
                        <p className="text-sm font-medium text-foreground">Do you own any property free and clear?</p>
                        {["Yes", "No"].map((option) => (
                          <label key={option} className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name="freeAndClear"
                              value={option}
                              checked={formData.ownPropertyFreeAndClear === option}
                              onChange={() => updateField("ownPropertyFreeAndClear", option)}
                              className="w-5 h-5 border-border bg-muted accent-primary"
                            />
                            <span className="text-foreground text-sm">{option}</span>
                          </label>
                        ))}
                      </div>

                      <div className="space-y-3">
                        <p className="text-sm font-medium text-foreground">Investing Experience *</p>
                        {[
                          { value: "beginner", label: "Beginner (New)" },
                          { value: "some", label: "Some Experience (1–4 Deals)" },
                          { value: "experienced", label: "Very Experienced (5+ Deals)" },
                        ].map((option) => (
                          <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name="experience"
                              value={option.value}
                              checked={formData.investingExperience === option.value}
                              onChange={() => updateField("investingExperience", option.value)}
                              className="w-5 h-5 border-border bg-muted accent-primary"
                            />
                            <span className="text-foreground text-sm">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Footer Navigation */}
          {!submitted && !disqualified && (
            <div className="sticky bottom-0 bg-card border-t border-border p-6 flex justify-between">
              {step > 1 ? (
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft size={16} />
                  Back
                </Button>
              ) : (
                <div />
              )}
              
              {step < 5 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
                >
                  Next
                  <ArrowRight size={16} />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed() || isSubmitting}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                  <ArrowRight size={16} />
                </Button>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
