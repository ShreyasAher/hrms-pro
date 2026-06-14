'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { subscriptionPlans, paymentHistory, invoices } from '@/data/payroll';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
  CreditCard, Check, Star, Crown, Zap, ArrowRight, Download,
  CheckCircle2, XCircle, Clock, RotateCcw, FileText, ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const gatewayStatusColors: Record<string, string> = {
  success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  failed: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  refunded: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
};

const gatewayStatusIcons: Record<string, typeof CheckCircle2> = {
  success: CheckCircle2,
  failed: XCircle,
  pending: Clock,
  refunded: RotateCcw,
};

export default function PaymentsPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState<'razorpay' | 'stripe' | null>(null);

  return (
    <PageWrapper title="Payments" subtitle="Subscription plans, billing, and payment gateway">
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Choose Your Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subscriptionPlans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className={cn(
                'neu-flat-lg p-6 relative overflow-hidden flex flex-col',
                plan.isPopular && 'ring-2 ring-primary scale-[1.02]'
              )}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0">
                  <div className="gradient-primary text-white text-[10px] font-bold px-4 py-1 transform rotate-0 rounded-bl-xl">
                    MOST POPULAR
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2 mb-3">
                {plan.name === 'Starter' && <Zap className="w-5 h-5" style={{ color: plan.color }} />}
                {plan.name === 'Professional' && <Star className="w-5 h-5" style={{ color: plan.color }} />}
                {plan.name === 'Enterprise' && <Crown className="w-5 h-5" style={{ color: plan.color }} />}
                <h4 className="text-lg font-bold">{plan.name}</h4>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold">₹{plan.price.toLocaleString('en-IN')}</span>
                <span className="text-sm text-muted-foreground">/{plan.period}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Up to {plan.employeeLimit === 500 ? 'Unlimited' : plan.employeeLimit} employees
              </p>
              <ul className="space-y-2 flex-1 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: plan.color }} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setSelectedGateway('razorpay')}
                className={cn(
                  'w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all',
                  plan.isPopular
                    ? 'gradient-primary text-white shadow-lg hover:opacity-90'
                    : 'neu-btn hover:text-primary'
                )}
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <Tabs defaultValue="history" className="space-y-4">
        <TabsList className="neu-flat-sm p-1 bg-transparent h-auto">
          <TabsTrigger value="history" className="rounded-lg text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">
            Payment History
          </TabsTrigger>
          <TabsTrigger value="invoices" className="rounded-lg text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">
            Invoices
          </TabsTrigger>
          <TabsTrigger value="gateways" className="rounded-lg text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">
            Payment Gateways
          </TabsTrigger>
        </TabsList>

        <TabsContent value="history">
          <div className="space-y-3">
            {paymentHistory.map((payment, i) => {
              const StatusIcon = gatewayStatusIcons[payment.status];
              return (
                <motion.div
                  key={payment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="neu-flat p-4 flex items-center gap-4"
                >
                  <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', payment.gateway === 'razorpay' ? 'bg-blue-500/10' : 'bg-purple-500/10')}>
                    <CreditCard className={cn('w-5 h-5', payment.gateway === 'razorpay' ? 'text-blue-500' : 'text-purple-500')} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{payment.description}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {payment.method} via {payment.gateway.charAt(0).toUpperCase() + payment.gateway.slice(1)} • {new Date(payment.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{payment.amount.toLocaleString('en-IN')}</p>
                    <Badge className={cn('text-[10px] border-0 capitalize mt-1', gatewayStatusColors[payment.status])}>
                      <StatusIcon className="w-3 h-3 mr-0.5" />{payment.status}
                    </Badge>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setShowSuccess(true)} className="px-4 py-2 rounded-xl bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600">
              Preview Success Screen
            </button>
            <button onClick={() => setShowFailed(true)} className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600">
              Preview Failed Screen
            </button>
          </div>
        </TabsContent>

        <TabsContent value="invoices">
          <div className="space-y-3">
            {invoices.map((invoice, i) => (
              <motion.div
                key={invoice.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="neu-flat p-4 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{invoice.invoiceNumber}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {new Date(invoice.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹{invoice.total.toLocaleString('en-IN')}</p>
                  <Badge className={cn('text-[10px] border-0 capitalize mt-1', invoice.status === 'paid' ? gatewayStatusColors.success : gatewayStatusColors.failed)}>
                    {invoice.status}
                  </Badge>
                </div>
                <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                  <Download className="w-4 h-4 text-muted-foreground" />
                </button>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="gateways">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="neu-flat-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Razorpay</h4>
                  <p className="text-xs text-muted-foreground">India&apos;s leading payment gateway</p>
                </div>
              </div>
              <div className="space-y-3 mb-5">
                <div className="p-3 rounded-xl bg-muted/30 flex items-center gap-3 cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center"><span className="text-sm">💳</span></div>
                  <div className="flex-1"><p className="text-sm font-medium">UPI Payment</p><p className="text-[10px] text-muted-foreground">Google Pay, PhonePe, Paytm</p></div>
                  <Check className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="p-3 rounded-xl bg-muted/30 flex items-center gap-3 cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center"><span className="text-sm">🏦</span></div>
                  <div className="flex-1"><p className="text-sm font-medium">Net Banking</p><p className="text-[10px] text-muted-foreground">All major banks</p></div>
                  <Check className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="p-3 rounded-xl bg-muted/30 flex items-center gap-3 cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center"><span className="text-sm">💰</span></div>
                  <div className="flex-1"><p className="text-sm font-medium">Wallets</p><p className="text-[10px] text-muted-foreground">Paytm, PhonePe Wallet</p></div>
                  <Check className="w-4 h-4 text-emerald-500" />
                </div>
              </div>
              <button onClick={() => setSelectedGateway('razorpay')} className="w-full py-3 rounded-xl bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 flex items-center justify-center gap-2">
                Pay with Razorpay <ExternalLink className="w-4 h-4" />
              </button>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="neu-flat-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Stripe</h4>
                  <p className="text-xs text-muted-foreground">Global payment infrastructure</p>
                </div>
              </div>
              <div className="space-y-3 mb-5">
                <div className="p-3 rounded-xl bg-muted/30 flex items-center gap-3 cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center"><span className="text-sm">💳</span></div>
                  <div className="flex-1"><p className="text-sm font-medium">Credit/Debit Cards</p><p className="text-[10px] text-muted-foreground">Visa, Mastercard, Amex</p></div>
                  <Check className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="p-3 rounded-xl bg-muted/30 flex items-center gap-3 cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center"><span className="text-sm">🌐</span></div>
                  <div className="flex-1"><p className="text-sm font-medium">International Cards</p><p className="text-[10px] text-muted-foreground">135+ currencies supported</p></div>
                  <Check className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="p-3 rounded-xl bg-muted/30 flex items-center gap-3 cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center"><span className="text-sm">🔒</span></div>
                  <div className="flex-1"><p className="text-sm font-medium">Apple Pay / Google Pay</p><p className="text-[10px] text-muted-foreground">One-click payments</p></div>
                  <Check className="w-4 h-4 text-emerald-500" />
                </div>
              </div>
              <button onClick={() => setSelectedGateway('stripe')} className="w-full py-3 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 flex items-center justify-center gap-2">
                Pay with Stripe <ExternalLink className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md neu-flat border-0 text-center p-8">
          <DialogTitle className="sr-only">Payment Successful</DialogTitle>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.5 }}>
            <div className="w-20 h-20 rounded-full gradient-success mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
          </motion.div>
          <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400">Payment Successful!</h3>
          <p className="text-sm text-muted-foreground mt-2">Your payment of ₹1,499 has been processed successfully.</p>
          <p className="text-xs text-muted-foreground mt-1">Transaction ID: TXN-2024-06-001</p>
          <button onClick={() => setShowSuccess(false)} className="mt-6 w-full py-3 rounded-xl gradient-primary text-white text-sm font-semibold">
            Continue
          </button>
        </DialogContent>
      </Dialog>

      <Dialog open={showFailed} onOpenChange={setShowFailed}>
        <DialogContent className="sm:max-w-md neu-flat border-0 text-center p-8">
          <DialogTitle className="sr-only">Payment Failed</DialogTitle>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.5 }}>
            <div className="w-20 h-20 rounded-full gradient-danger mx-auto flex items-center justify-center mb-4">
              <XCircle className="w-10 h-10 text-white" />
            </div>
          </motion.div>
          <h3 className="text-xl font-bold text-red-600 dark:text-red-400">Payment Failed</h3>
          <p className="text-sm text-muted-foreground mt-2">We were unable to process your payment. Please try again.</p>
          <p className="text-xs text-muted-foreground mt-1">Error: Card declined — insufficient funds</p>
          <div className="flex gap-2 mt-6">
            <button onClick={() => setShowFailed(false)} className="flex-1 py-3 rounded-xl neu-btn text-sm font-semibold">
              Cancel
            </button>
            <button onClick={() => { setShowFailed(false); setShowSuccess(true); }} className="flex-1 py-3 rounded-xl gradient-primary text-white text-sm font-semibold">
              Retry Payment
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedGateway} onOpenChange={() => setSelectedGateway(null)}>
        <DialogContent className="sm:max-w-md neu-flat border-0 p-0 overflow-hidden">
          <div className={cn('p-6 text-white', selectedGateway === 'razorpay' ? 'bg-blue-500' : 'bg-purple-600')}>
            <DialogTitle className="text-lg font-bold text-white">
              {selectedGateway === 'razorpay' ? 'Razorpay' : 'Stripe'} Checkout
            </DialogTitle>
            <p className="text-white/80 text-sm mt-1">Complete your payment securely</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="p-4 rounded-xl bg-muted/30 text-center">
              <p className="text-sm text-muted-foreground">Amount to Pay</p>
              <p className="text-3xl font-bold mt-1">₹1,499</p>
              <p className="text-xs text-muted-foreground mt-1">Professional Plan — Monthly</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Card Number</label>
              <input className="w-full mt-1 px-3 py-2.5 text-sm rounded-xl neu-input focus:outline-none font-mono" placeholder="4242 4242 4242 4242" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Expiry</label>
                <input className="w-full mt-1 px-3 py-2.5 text-sm rounded-xl neu-input focus:outline-none font-mono" placeholder="MM/YY" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">CVV</label>
                <input className="w-full mt-1 px-3 py-2.5 text-sm rounded-xl neu-input focus:outline-none font-mono" placeholder="***" type="password" />
              </div>
            </div>
            <button
              onClick={() => { setSelectedGateway(null); setShowSuccess(true); }}
              className={cn('w-full py-3 rounded-xl text-white text-sm font-semibold', selectedGateway === 'razorpay' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-purple-600 hover:bg-purple-700')}
            >
              Pay ₹1,499 Securely
            </button>
            <p className="text-[10px] text-muted-foreground text-center">🔒 Secured by 256-bit SSL encryption</p>
          </div>
        </DialogContent>
      </Dialog>
    </PageWrapper>
  );
}
