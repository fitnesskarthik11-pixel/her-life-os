import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const plans = [
  {
    name: "Starter",
    price: "₹499",
    period: "/month",
    annual: "₹4,990/year",
    description: "Perfect for getting started",
    modules: "5 modules",
    features: [
      "5 module access",
      "Basic AI insights",
      "Core health tracking",
      "Financial basics",
      "Community read access",
    ],
    popular: false,
    accent: "sage",
  },
  {
    name: "Pro",
    price: "₹1,999",
    period: "/month",
    annual: "₹19,990/year",
    description: "For women who want more",
    modules: "15 modules",
    features: [
      "15 module access",
      "Full AI insights",
      "Community access",
      "Wearable sync",
      "Priority support",
      "PDF/CSV exports",
    ],
    popular: true,
    accent: "primary",
  },
  {
    name: "Elite",
    price: "₹3,999",
    period: "/month",
    annual: "₹39,990/year",
    description: "The complete experience",
    modules: "All 30 modules",
    features: [
      "All 30 modules",
      "Family sharing (up to 5)",
      "Priority AI assistant",
      "Expert content library",
      "Mentorship access",
      "Business tools suite",
      "No ads",
    ],
    popular: false,
    accent: "lavender",
  },
];

const UPI_ID = "8884162999-4@ybl";

const PricingSection = () => {
  const [qrOpen, setQrOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const handlePayment = (planName: string) => {
    setSelectedPlan(planName);
    setQrOpen(true);
  };

  const upiUrl = `upi://pay?pa=${UPI_ID}&pn=HerSphere30&cu=INR`;

  return (
    <section id="pricing" className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Choose Your <span className="text-gradient-hero">Plan</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Invest in yourself. Pay securely with UPI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 border-2 transition-all ${
                plan.popular
                  ? "border-primary bg-card shadow-glow scale-[1.03]"
                  : "border-border bg-card shadow-card hover:shadow-soft"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-hero text-primary-foreground text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <h3 className="font-display text-2xl font-bold mb-1">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold font-display">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
                <div className="text-xs text-muted-foreground mt-1">{plan.annual} billed annually</div>
              </div>

              <Button
                className={`w-full rounded-full mb-6 h-12 text-base font-semibold ${
                  plan.popular
                    ? "bg-gradient-hero text-primary-foreground shadow-glow hover:opacity-90"
                    : ""
                }`}
                variant={plan.popular ? "default" : "outline"}
                onClick={() => handlePayment(plan.name)}
              >
                Get {plan.name}
              </Button>

              <div className="space-y-3">
                <div className="text-sm font-semibold text-foreground">{plan.modules}</div>
                {plan.features.map(f => (
                  <div key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-sage mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* UPI QR Dialog */}
      <Dialog open={qrOpen} onOpenChange={setQrOpen}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              Pay for {selectedPlan}
            </DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground text-sm mb-4">
            Scan the QR code below with any UPI app to complete your payment.
          </p>
          <div className="flex justify-center p-6 bg-card rounded-xl shadow-card">
            <QRCodeSVG
              value={upiUrl}
              size={200}
              bgColor="transparent"
              fgColor="hsl(340, 20%, 15%)"
              level="H"
              imageSettings={{
                src: "",
                height: 0,
                width: 0,
                excavate: false,
              }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Scan with Google Pay, PhonePe, Paytm, or any UPI app
          </p>
          <p className="text-xs font-medium text-foreground mt-1">HerSphere 30</p>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PricingSection;
