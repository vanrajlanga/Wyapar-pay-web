'use client';

import { Card } from '@/components/ui';
import { Button } from '@/components/ui';
import { Wallet, Plus, ArrowUpRight, History } from 'lucide-react';

export function WalletCard() {
  return (
    <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-0 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            <span className="opacity-90">Wallet Balance</span>
          </div>
          <Button variant="ghost" className="text-white hover:bg-white/20">
            <History className="h-4 w-4 mr-2" />
            History
          </Button>
        </div>

        <div className="mb-6">
          <div className="text-4xl mb-1 font-bold">₹12,450.00</div>
          <div className="text-sm opacity-75">
            +₹500 cashback earned this month
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="flex-1 bg-white text-orange-600 hover:bg-white/90 font-semibold">
            <Plus className="h-4 w-4 mr-2" />
            Add Money
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-white/30 text-white hover:bg-white/20"
          >
            <ArrowUpRight className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
      </div>
    </Card>
  );
}
