"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAdminOrders, updateAdminOrderStatus, AdminOrder, getDeliveryDrivers, DeliveryDriver, assignDriverToOrder } from "@/lib/api/admin";
import { toast } from "react-toastify";
import {
  ShoppingBag,
  Search,
  RefreshCw,
  Eye,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Package,
  DollarSign,
  User,
  MapPin,
  Filter,
  ChevronDown,
  Calendar,
  Phone,
  Mail,
  MoreVertical,
  ArrowLeft,
  ArrowUpDown,
  UserCheck
} from "lucide-react";
import Link from "next/link";

const AdminOrdersPage = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<'date' | 'total' | 'status'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [drivers, setDrivers] = useState<DeliveryDriver[]>([]);
  const [assigningDriverFor, setAssigningDriverFor] = useState<string | null>(null);
  const [selectedDriverId, setSelectedDriverId] = useState<string>("");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await getAdminOrders();
      if (response.success) {
        setOrders(response.data);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // Fetch available drivers
    getDeliveryDrivers()
      .then(d => setDrivers(d))
      .catch(() => console.log('No drivers available'));
  }, []);

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    setUpdatingStatus(orderId);
    try {
      await updateAdminOrderStatus(orderId, newStatus);
      toast.success("Order status updated successfully");
      fetchOrders(); // Refresh the list
    } catch (error: any) {
      toast.error(error.message || "Failed to update order status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleAssignDriver = async (orderId: string) => {
    if (!selectedDriverId) {
      toast.error("Please select a driver");
      return;
    }
    try {
      await assignDriverToOrder(orderId, selectedDriverId);
      toast.success("Driver assigned successfully");
      setAssigningDriverFor(null);
      setSelectedDriverId("");
      fetchOrders();
    } catch (error: any) {
      toast.error(error.message || "Failed to assign driver");
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return {
          color: 'bg-orange-100 text-orange-800 border-orange-200',
          icon: Clock,
          label: 'Pending',
          bgColor: 'bg-orange-50'
        };
      case 'confirmed':
        return {
          color: 'bg-primary-100 text-primary-800 border-primary-200',
          icon: CheckCircle,
          label: 'Confirmed',
          bgColor: 'bg-primary-50'
        };
      case 'processing':
        return {
          color: 'bg-purple-100 text-purple-800 border-purple-200',
          icon: RefreshCw,
          label: 'Processing',
          bgColor: 'bg-purple-50'
        };
      case 'shipped':
        return {
          color: 'bg-primary-100 text-primary-800 border-primary-200',
          icon: Truck,
          label: 'Shipped',
          bgColor: 'bg-primary-50'
        };
      case 'outfordelivery':
        return {
          color: 'bg-teal-100 text-teal-800 border-teal-200',
          icon: Truck,
          label: 'Out for Delivery',
          bgColor: 'bg-teal-50'
        };
      case 'delivered':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: CheckCircle,
          label: 'Delivered',
          bgColor: 'bg-green-50'
        };
      case 'cancelled':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: XCircle,
          label: 'Cancelled',
          bgColor: 'bg-red-50'
        };
      case 'refunded':
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: XCircle,
          label: 'Refunded',
          bgColor: 'bg-gray-50'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: Package,
          label: 'Unknown',
          bgColor: 'bg-gray-50'
        };
    }
  };

  const filteredAndSortedOrders = orders
    .filter(order => {
      const matchesSearch =
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.userId?.fullName || order.userId?.name)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case 'date':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        case 'total':
          aValue = a.total;
          bValue = b.total;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const statusOptions = [
    { value: "all", label: "All Status", count: orders.length },
    { value: "pending", label: "Pending", count: orders.filter(o => o.status === 'pending').length },
    { value: "confirmed", label: "Confirmed", count: orders.filter(o => o.status === 'confirmed').length },
    { value: "processing", label: "Processing", count: orders.filter(o => o.status === 'processing').length },
    { value: "shipped", label: "Shipped", count: orders.filter(o => o.status === 'shipped').length },
    { value: "outForDelivery", label: "Out for Delivery", count: orders.filter(o => o.status === 'outForDelivery').length },
    { value: "delivered", label: "Delivered", count: orders.filter(o => o.status === 'delivered').length },
    { value: "cancelled", label: "Cancelled", count: orders.filter(o => o.status === 'cancelled').length },
    { value: "refunded", label: "Refunded", count: orders.filter(o => o.status === 'refunded').length },
  ];

  const nextStatuses = {
    pending: ['confirmed', 'cancelled'],
    confirmed: ['processing', 'cancelled'],
    processing: ['shipped', 'cancelled'],
    shipped: ['outForDelivery', 'cancelled'],
    outForDelivery: ['delivered'],
    delivered: [],
    cancelled: ['refunded'],
    refunded: []
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-primary-50 to-primary-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/dashboard"
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-600 flex items-center justify-center shadow-lg">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Manage Orders</h1>
                  <p className="text-sm text-gray-600">{orders.length} total orders</p>
                </div>
              </div>
            </div>
            <button
              onClick={fetchOrders}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
              disabled={loading}
            >
              <RefreshCw className={`w-5 h-5 text-slate-600 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by order ID, customer name, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4  text-black py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="lg:w-64">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label} ({option.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="lg:w-48">
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field as any);
                  setSortOrder(order as any);
                }}
                className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="total-desc">Highest Amount</option>
                <option value="total-asc">Lowest Amount</option>
                <option value="status-asc">Status A-Z</option>
                <option value="status-desc">Status Z-A</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
                <div className="flex items-center justify-between mb-4">
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-32" />
                    <div className="h-4 bg-gray-200 rounded w-24" />
                  </div>
                  <div className="h-6 bg-gray-200 rounded-full w-20" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-20" />
                    <div className="h-4 bg-gray-200 rounded w-32" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-16" />
                    <div className="h-4 bg-gray-200 rounded w-24" />
                  </div>
                  <div className="flex justify-end">
                    <div className="h-8 bg-gray-200 rounded w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredAndSortedOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No orders found</h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== 'all' ? 'Try adjusting your search or filters' : 'Orders will appear here when customers place them'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAndSortedOrders.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              const StatusIcon = statusConfig.icon;
              const availableStatuses = nextStatuses[order.status.toLowerCase() as keyof typeof nextStatuses] || [];

              return (
                <div key={order._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                        <Package className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Order #{order._id.slice(-6)}
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className={`inline-flex items-center px-4 py-2 rounded-lg border ${statusConfig.color}`}>
                      <StatusIcon className="w-4 h-4 mr-2" />
                      <span className="font-medium">{statusConfig.label}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Customer Info */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-900">Customer</span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-900">{order.userId?.fullName || order.userId?.name || 'N/A'}</p>
                        <div className="flex items-center space-x-1">
                          <Mail className="w-3 h-3 text-gray-500" />
                          <p className="text-xs text-gray-600">{order.userId?.email || 'N/A'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <ShoppingBag className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-900">Order Summary</span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">{order.items?.length || 0} items</p>
                        <p className="text-sm font-bold text-primary-600">${order.total?.toFixed(2) || '0.00'}</p>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-900">Shipping</span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">{order.shippingAddress?.city || 'N/A'}</p>
                        <p className="text-xs text-gray-500">{order.shippingAddress?.country || ''}</p>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Driver Assignment */}
                  {['processing', 'shipped', 'outForDelivery'].includes(order.status.toLowerCase()) && (
                    <div className="mb-4 p-4 rounded-lg border border-teal-200 bg-teal-50">
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <Truck className="w-4 h-4 text-teal-600" />
                          <span className="text-sm font-semibold text-teal-900">Delivery Driver</span>
                        </div>
                        {(order as any).deliveryPerson?.name ? (
                          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-xs font-bold">
                                {(order as any).deliveryPerson.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{(order as any).deliveryPerson.name}</p>
                                <p className="text-xs text-gray-600">{(order as any).deliveryPerson.phone} • {(order as any).deliveryPerson.vehicle}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => { setAssigningDriverFor(order._id); setSelectedDriverId(""); }}
                              className="text-xs text-teal-700 hover:text-teal-900 font-medium underline"
                            >
                              Reassign
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => { setAssigningDriverFor(order._id); setSelectedDriverId(""); }}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700 transition-colors"
                          >
                            <UserCheck className="w-4 h-4" />
                            Assign Driver
                          </button>
                        )}
                      </div>

                      {assigningDriverFor === order._id && (
                        <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
                          <select
                            value={selectedDriverId}
                            onChange={(e) => setSelectedDriverId(e.target.value)}
                            style={{
                              flex: 1,
                              minWidth: "200px",
                              padding: "0.5rem 0.75rem",
                              border: "1px solid #d1d5db",
                              borderRadius: "0.5rem",
                              fontSize: "0.875rem",
                              color: "#111827",
                              backgroundColor: "#fff",
                            }}
                          >
                            <option value="">Select a driver...</option>
                            {drivers.filter(d => d.isActive).map(driver => (
                              <option key={driver._id} value={driver._id}>
                                {driver.name} — {driver.vehicleNumber} ({driver.phone})
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => handleAssignDriver(order._id)}
                            disabled={!selectedDriverId}
                            style={{
                              padding: "0.5rem 1rem",
                              backgroundColor: selectedDriverId ? "#0d9488" : "#9ca3af",
                              color: "#fff",
                              border: "none",
                              borderRadius: "0.5rem",
                              cursor: selectedDriverId ? "pointer" : "not-allowed",
                              fontSize: "0.875rem",
                              fontWeight: 500,
                            }}
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setAssigningDriverFor(null)}
                            style={{
                              padding: "0.5rem 1rem",
                              backgroundColor: "#fff",
                              color: "#374151",
                              border: "1px solid #d1d5db",
                              borderRadius: "0.5rem",
                              cursor: "pointer",
                              fontSize: "0.875rem",
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-3">
                      <Link
                        href={`/admin/orders/${order._id}`}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Link>
                    </div>

                    {/* Status Update */}
                    {availableStatuses.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Update to:</span>
                        <div className="flex space-x-2">
                          {availableStatuses.map(status => (
                            <button
                              key={status}
                              onClick={() => handleStatusUpdate(order._id, status)}
                              disabled={updatingStatus === order._id}
                              className="px-3 py-1 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors duration-200"
                            >
                              {updatingStatus === order._id ? (
                                <RefreshCw className="w-4 h-4 animate-spin" />
                              ) : (
                                status.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;