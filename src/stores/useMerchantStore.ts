import { create } from 'zustand'
import type { Merchant } from '@/domain/entities/Merchant'

interface MerchantStore {
  merchant: Merchant | null
  isRegistered: boolean
  setIsRegistered: (isRegistered: boolean) => void
  setMerchant: (merchant: Merchant) => void
  clearMerchant: () => void
}

export const useMerchantStore = create<MerchantStore>((set) => ({
  merchant: null,
  isRegistered: false,
  setIsRegistered: (isRegistered) => set({ isRegistered }),
  setMerchant: (merchant) => set({ merchant }),
  clearMerchant: () => set({ merchant: null }),
}))
