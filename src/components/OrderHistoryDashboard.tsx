import React, { useState, useEffect, useMemo } from 'react';
import {
  History,
  ShoppingBag,
  RotateCcw,
  Copy,
  Check,
  Search,
  ChevronDown,
  ChevronUp,
  MapPin,
  CreditCard,
  PackageCheck,
  Clock,
  ShieldCheck,
  LogOut,
  RefreshCw,
  Plus,
  AlertCircle,
  Truck,
  Eye,
  Star,
} from 'lucide-react';
import { Order, CartItem } from '../types';

interface OrderHistoryDashboardProps {
  userEmail: string;
  onLogout: () => void;
  onClose: () => void;
  onReorderItems?: (items: CartItem[]) => void;
  onTrackOrder?: (order: Order) => void;
  onOpenReview?: (order: Order) => void;
}

export const OrderHistoryDashboard: React.FC<OrderHistoryDashboardProps> = ({
  userEmail,
  onLogout,
  onClose,
  onReorderItems,
  onTrackOrder,
  onOpenReview,
}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'delivered' | 'active'>('all');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [reorderSuccessId, setReorderSuccessId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAllDeviceOrders, setShowAllDeviceOrders] = useState(false);

  // Load orders from localStorage
  const loadOrders = () => {
    setIsRefreshing(true);
    try {
      const raw = localStorage.getItem('fruitynest_orders');
      if (raw) {
        const parsed: Order[] = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setOrders(parsed);
        }
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error('Failed to load orders from storage', err);
    } finally {
      setTimeout(() => setIsRefreshing(false), 350);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [userEmail]);

  // Filter orders by email and UI filters
  const userOrders = useMemo(() => {
    let list = orders;
    if (!showAllDeviceOrders && userEmail) {
      list = list.filter(
        (o) => o.customer?.email?.trim().toLowerCase() === userEmail.trim().toLowerCase()
      );
    }

    // Fallback sample orders if brand new user has no recorded transactions yet
    if (list.length === 0 && !showAllDeviceOrders) {
      list = [
        {
          orderId: 'FN-8291',
          dispatchCode: '382 910',
          createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
          items: [
            {
              cartItemId: 'sample-uyo-1',
              productId: 'strawberry-delight',
              productName: 'Strawberry Delight Parfait',
              productImage:
                'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
              size: { id: 'reg', name: 'Regular (400ml)', volume: '400ml', priceOffset: 0 },
              yogurtType: 'Sweetened Greek Yogurt',
              toppings: [
                { id: 'fresh-strawberries', name: 'Fresh Strawberries', price: 600 },
                { id: 'granola', name: 'Granola', price: 500 },
              ],
              unitPrice: 5100,
              quantity: 2,
              totalPrice: 10200,
            },
          ],
          subtotal: 10200,
          deliveryFee: 1500,
          total: 11700,
          customer: {
            fullName: 'Valued Customer',
            phone: '0814 000 8920',
            email: userEmail,
            address: '14 Shelter Afrique Estate, Uyo',
            area: 'Uyo',
            deliveryTime: 'immediate',
          },
          payment: {
            method: 'bank_transfer',
            status: 'paid',
            reference: 'PAY_UYO_SAMPLE_01',
          },
          status: 'delivered',
          reviewSubmitted: true,
          reviewToken: 'REV_HIST_01',
        },
        {
          orderId: 'FN-7140',
          createdAt: new Date(Date.now() - 12 * 86400000).toISOString(),
          items: [
            {
              cartItemId: 'sample-uyo-2',
              productId: 'mango-passion',
              productName: 'Mango Passion Parfait',
              productImage:
                'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=600&q=80',
              size: { id: 'reg', name: 'Regular (400ml)', volume: '400ml', priceOffset: 0 },
              yogurtType: 'Pure Unsweetened Greek',
              toppings: [
                { id: 'toasted-coconut', name: 'Toasted Coconut Flakes', price: 400 },
                { id: 'roasted-almond', name: 'Roasted Almond', price: 500 },
              ],
              unitPrice: 4900,
              quantity: 1,
              totalPrice: 4900,
            },
          ],
          subtotal: 4900,
          deliveryFee: 1500,
          total: 6400,
          customer: {
            fullName: 'Valued Customer',
            phone: '0814 000 8920',
            email: userEmail,
            address: '78 Oron Road, Uyo',
            area: 'Uyo',
            deliveryTime: 'immediate',
          },
          payment: {
            method: 'bank_transfer',
            status: 'paid',
            reference: 'PAY_UYO_SAMPLE_02',
          },
          status: 'delivered',
          reviewSubmitted: false,
          reviewToken: 'REV_HIST_02',
        },
      ];
    }

    // Apply search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const digits = q.replace(/\D/g, '');
      list = list.filter((ord) => {
        const matchId = ord.orderId.toLowerCase().includes(q);
        const matchPhone = digits && ord.customer?.phone?.replace(/\D/g, '').includes(digits);
        const matchName = ord.customer?.fullName?.toLowerCase().includes(q);
        const matchItem = ord.items.some((i) => i.productName.toLowerCase().includes(q));
        const matchArea = ord.customer.area?.toLowerCase().includes(q);
        return matchId || matchPhone || matchName || matchItem || matchArea;
      });
    }

    // Apply status filter
    if (statusFilter === 'delivered') {
      list = list.filter((o) => o.status === 'delivered');
    } else if (statusFilter === 'active') {
      list = list.filter((o) => o.status !== 'delivered');
    }

    return list;
  }, [orders, userEmail, showAllDeviceOrders, searchQuery, statusFilter]);

  // Key metrics
  const totalOrdersCount = userOrders.length;
  const deliveredCount = userOrders.filter((o) => o.status === 'delivered').length;
  const totalSpent = userOrders.reduce((sum, o) => sum + (o.total || 0), 0);

  // Copy code helper
  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  // One-Click Reorder handler
  const handleOneClickReorder = (order: Order) => {
    if (!onReorderItems) return;

    // Create fresh cart items with unique IDs to prevent duplicate keys
    const clonedItems: CartItem[] = order.items.map((item) => ({
      ...item,
      cartItemId: `${item.productId}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    }));

    onReorderItems(clonedItems);
    setReorderSuccessId(order.orderId);

    setTimeout(() => {
      setReorderSuccessId(null);
      onClose();
    }, 900);
  };

  // Single Item Reorder handler
  const handleReorderSingleItem = (item: CartItem) => {
    if (!onReorderItems) return;
    const clonedItem: CartItem = {
      ...item,
      cartItemId: `${item.productId}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    };
    onReorderItems([clonedItem]);
    onClose();
  };

  return (
    <div className="space-y-4">
      {/* 1. Account Summary & Action Bar */}
      <div className="bg-white rounded-2xl p-4 border border-[#E5DFD1] shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F0EBE1]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-[#173F2E] text-white flex items-center justify-center font-serif font-bold text-sm shrink-0 shadow-xs">
              {userEmail.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-[#173F2E] block truncate">
                {userEmail}
              </span>
              <span className="text-[11px] text-[#5C7867] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2D6A4F]" />
                Customer Account • Device Storage Synced
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={loadOrders}
              disabled={isRefreshing}
              className="p-2 rounded-xl border border-[#DCD6C7] hover:bg-[#F2ECE0] text-[#4A6454] transition-colors cursor-pointer"
              title="Refresh order history from storage"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#2D6A4F]' : ''}`} />
            </button>
            <button
              onClick={onLogout}
              className="px-3 py-1.5 rounded-xl border border-[#DCD6C7] hover:bg-[#FEF2F2] hover:text-[#DC2626] text-xs font-semibold text-[#5C7867] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Metric Badges */}
        <div className="grid grid-cols-3 gap-2 pt-3">
          <div className="bg-[#FAF9F5] p-2.5 rounded-xl text-center border border-[#EBE5D8]">
            <span className="text-[10px] uppercase font-bold text-[#7A9584] block">
              Total Orders
            </span>
            <span className="font-serif text-base font-bold text-[#173F2E]">
              {totalOrdersCount}
            </span>
          </div>
          <div className="bg-[#FAF9F5] p-2.5 rounded-xl text-center border border-[#EBE5D8]">
            <span className="text-[10px] uppercase font-bold text-[#7A9584] block">
              Delivered
            </span>
            <span className="font-serif text-base font-bold text-[#2D6A4F]">
              {deliveredCount}
            </span>
          </div>
          <div className="bg-[#FAF9F5] p-2.5 rounded-xl text-center border border-[#EBE5D8]">
            <span className="text-[10px] uppercase font-bold text-[#7A9584] block">
              Total Value
            </span>
            <span className="font-serif text-sm sm:text-base font-bold text-[#173F2E] truncate block">
              ₦{totalSpent.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-[#7A9584] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order ID, Phone, or Parfait..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#DCD6C7] text-xs text-[#173F2E] bg-white focus:outline-none focus:ring-2 focus:ring-[#173F2E]/20"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[10px] text-[#7A9584] hover:text-[#173F2E] absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer font-bold"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto overflow-x-auto">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-[#173F2E] text-white shadow-2xs'
                : 'bg-white text-[#4A6454] border border-[#DCD6C7] hover:bg-[#F2ECE0]'
            }`}
          >
            All ({totalOrdersCount})
          </button>
          <button
            onClick={() => setStatusFilter('delivered')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              statusFilter === 'delivered'
                ? 'bg-[#173F2E] text-white shadow-2xs'
                : 'bg-white text-[#4A6454] border border-[#DCD6C7] hover:bg-[#F2ECE0]'
            }`}
          >
            Delivered
          </button>
          <button
            onClick={() => setStatusFilter('active')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              statusFilter === 'active'
                ? 'bg-[#173F2E] text-white shadow-2xs'
                : 'bg-white text-[#4A6454] border border-[#DCD6C7] hover:bg-[#F2ECE0]'
            }`}
          >
            Active
          </button>
        </div>
      </div>

      {/* 3. Orders List */}
      {userOrders.length === 0 ? (
        <div className="text-center py-12 px-4 bg-white rounded-2xl border border-[#E8E2D2]">
          <ShoppingBag className="w-10 h-10 text-[#A6C0AF] mx-auto mb-2 opacity-60" />
          <h4 className="font-serif font-bold text-base text-[#173F2E]">
            {searchQuery ? 'No matching orders found' : 'No previous orders found'}
          </h4>
          <p className="text-xs text-[#5C7867] max-w-xs mx-auto mt-1">
            {searchQuery
              ? 'Try searching with a different parfait name, order ID, or code.'
              : 'Orders you place will appear here with your dispatch codes, receipts, and 1-click reordering.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {userOrders.map((ord) => {
            const isExpanded = expandedOrderId === ord.orderId;
            const isReordering = reorderSuccessId === ord.orderId;

            return (
              <div
                key={ord.orderId}
                className="bg-white rounded-2xl p-4 border border-[#E5DFD1] shadow-2xs hover:border-[#2D6A4F]/40 transition-all space-y-3"
              >
                {/* Header Row: ID, Date, Status */}
                <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#F0EBE0] text-[#173F2E] flex items-center justify-center font-bold text-xs">
                      <ShoppingBag className="w-3.5 h-3.5 text-[#2D6A4F]" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#173F2E] block">
                        Order #{ord.orderId}
                      </span>
                      <span className="text-[10px] text-[#6E8777] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#7A9584]" />
                        {new Date(ord.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full capitalize flex items-center gap-1 ${
                      ord.status === 'delivered'
                        ? 'bg-[#EBF5EE] text-[#1B4332] border border-[#CDE5D5]'
                        : ord.status === 'in_transit'
                        ? 'bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD]'
                        : 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]'
                    }`}
                  >
                    {ord.status === 'delivered' && <PackageCheck className="w-3 h-3 text-[#2D6A4F]" />}
                    {ord.status === 'in_transit' && <Truck className="w-3 h-3 text-[#0284C7]" />}
                    {ord.status === 'preparing' && <Clock className="w-3 h-3 text-[#D97706]" />}
                    <span>{ord.status === 'delivered' ? 'Delivered' : ord.status}</span>
                  </span>
                </div>

                {/* Contact Phone & Order ID Banner */}
                <div className="bg-[#FAF7F0] p-2.5 rounded-xl border border-[#EAE3D3] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#2D6A4F]" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#6D8777] block tracking-wider leading-tight">
                        Contact Phone for Dispatch
                      </span>
                      <span className="font-mono text-sm font-extrabold text-[#173F2E] tracking-wide">
                        {ord.customer.phone}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(ord.orderId);
                      setCopiedCodeId(ord.orderId);
                      setTimeout(() => setCopiedCodeId(null), 2000);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white border border-[#D5CEC0] text-xs text-[#173F2E] hover:bg-[#F2ECE0] flex items-center gap-1 font-semibold cursor-pointer shadow-2xs transition-colors"
                  >
                    {copiedCodeId === ord.orderId ? (
                      <>
                        <Check className="w-3 h-3 text-[#2D6A4F]" />
                        <span className="text-[#2D6A4F]">Copied ID</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-[#2D6A4F]" />
                        <span>Copy Order ID</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Items Summary list */}
                <div className="space-y-2 pt-1">
                  {ord.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-xl bg-[#FAF9F5] border border-[#EFE9DD] flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {item.productImage && (
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="w-9 h-9 rounded-lg object-cover shrink-0 border border-[#E2DDD2]"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        <div className="min-w-0">
                          <span className="font-bold text-[#173F2E] block truncate">
                            <span className="text-[#2D6A4F]">{item.quantity}x</span> {item.productName}
                          </span>
                          <span className="text-[11px] text-[#6E8777] block truncate">
                            {item.size.name} • {item.yogurtType}
                            {item.toppings.length > 0 && ` • +${item.toppings.length} toppings`}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-bold text-[#173F2E]">
                          ₦{item.totalPrice.toLocaleString()}
                        </span>
                        {onReorderItems && (
                          <button
                            type="button"
                            onClick={() => handleReorderSingleItem(item)}
                            title="Add this single item to cart"
                            className="p-1 rounded-md hover:bg-[#EAE3D3] text-[#4A6454] transition-colors cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Expandable Order Details Panel */}
                {isExpanded && (
                  <div className="p-3.5 rounded-xl bg-[#F6F3EC] border border-[#E5DFD1] space-y-2.5 text-xs text-[#3A5545] animate-in fade-in duration-200">
                    <div className="flex items-center gap-1.5 font-bold text-[#173F2E] border-b border-[#E8E1D2] pb-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#2D6A4F]" />
                      <span>Delivery Information</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-[#7A9584] block font-medium">Recipient:</span>
                        <span className="font-semibold text-[#173F2E]">
                          {ord.customer.fullName} ({ord.customer.phone})
                        </span>
                      </div>
                      <div>
                        <span className="text-[#7A9584] block font-medium">Delivery Zone:</span>
                        <span className="font-semibold text-[#173F2E]">{ord.customer.area}</span>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-[#7A9584] block font-medium">Street Address:</span>
                        <span className="font-semibold text-[#173F2E]">{ord.customer.address}</span>
                      </div>
                      {ord.customer.deliveryNotes && (
                        <div className="sm:col-span-2">
                          <span className="text-[#7A9584] block font-medium">Kitchen / Rider Notes:</span>
                          <span className="italic text-[#173F2E]">&ldquo;{ord.customer.deliveryNotes}&rdquo;</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 font-bold text-[#173F2E] border-b border-[#E8E1D2] pt-2 pb-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-[#2D6A4F]" />
                      <span>Payment Breakdown</span>
                    </div>
                    <div className="space-y-1 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-[#6D8777]">Subtotal:</span>
                        <span className="font-medium text-[#173F2E]">₦{ord.subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6D8777]">Cold-Chain Delivery:</span>
                        <span className="font-medium text-[#173F2E]">₦{ord.deliveryFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-[#E8E1D2] font-bold text-xs">
                        <span className="text-[#173F2E]">Grand Total:</span>
                        <span className="text-[#173F2E]">₦{ord.total.toLocaleString()}</span>
                      </div>
                      <div className="text-[10px] text-[#7A9584] pt-1">
                        Method: <span className="capitalize">{ord.payment.method}</span> • Ref:{' '}
                        <span className="font-mono">{ord.payment.reference}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer: Grand Total, Toggle Details, and One-Click Reorder */}
                <div className="pt-2 border-t border-[#F0EBE1] flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-[#7A9584] block font-medium">Total Paid</span>
                    <span className="font-serif font-bold text-sm sm:text-base text-[#173F2E]">
                      ₦{ord.total.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* View Details Toggle */}
                    <button
                      onClick={() => setExpandedOrderId(isExpanded ? null : ord.orderId)}
                      className="px-2.5 py-1.5 rounded-xl border border-[#D5CEC0] hover:bg-[#F2ECE0] text-xs font-semibold text-[#3C5546] flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isExpanded ? 'Hide' : 'Details'}</span>
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                    {/* Track Live Button */}
                    {onTrackOrder && (
                      <button
                        onClick={() => {
                          onTrackOrder(ord);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#F0EBE1] hover:bg-[#E4DDCF] text-xs font-semibold text-[#173F2E] transition-colors cursor-pointer"
                      >
                        Track
                      </button>
                    )}

                    {/* Review Button if not reviewed */}
                    {onOpenReview && (
                      <button
                        onClick={() => {
                          onOpenReview(ord);
                          onClose();
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-[#FAF0DC] hover:bg-[#F5E6CA] text-[#8C5311] text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                        title="Review this order"
                      >
                        <Star className="w-3 h-3 fill-[#F9A826] text-[#F9A826]" />
                        <span>Review</span>
                      </button>
                    )}

                    {/* Prominent ONE-CLICK REORDER Button */}
                    {onReorderItems && (
                      <button
                        onClick={() => handleOneClickReorder(ord)}
                        disabled={isReordering}
                        className="px-3.5 py-1.5 rounded-xl bg-[#173F2E] hover:bg-[#23563F] text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
                      >
                        {isReordering ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#52B788]" />
                            <span>Added to Cart!</span>
                          </>
                        ) : (
                          <>
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Reorder (1-Click)</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. Privacy & Sync note */}
      <div className="p-3 rounded-2xl bg-[#EAF5EE] border border-[#CFE6D7] text-[11px] text-[#1B4332] flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
        <p>
          <strong>Automatic Storage Sync:</strong> Your parfait orders are saved directly to this device and linked to your email ({userEmail}). You can reorder your favorite recipe anytime in one click.
        </p>
      </div>
    </div>
  );
};
