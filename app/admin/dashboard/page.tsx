"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getDashboardStats, getRecentUsers } from "@/lib/api/admin";
import { useAuth } from "@/lib/context/auth-context";
import LogoutButton from "../../_components/logout-button";
import { useCurrency } from "@/lib/hooks/useCurrency";
import {
  Users,
  ShoppingBag,
  Package,
  DollarSign,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  BarChart3,
  Activity,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();
  const { format: formatCurrency } = useCurrency();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async (showRefreshing = false) => {
    if (showRefreshing) setRefreshing(true);
    setError(null);
    try {
      const [statsResponse, usersResponse] = await Promise.all([
        getDashboardStats(),
        getRecentUsers(5)
      ]);

      if (statsResponse.success) {
        setStats(statsResponse.data);
      } else {
        setError(statsResponse.message || "Failed to load dashboard data");
      }
      if (usersResponse.success) {
        setRecentUsers(Array.isArray(usersResponse.data) ? usersResponse.data : []);
      } else {
        setError(usersResponse.message || "Failed to load dashboard data");
      }
    } catch (error: any) {
      setError(error.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
      if (showRefreshing) setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Generate activity log from recent data
  const generateActivityLog = () => {
    const activities: any[] = [];

    // Add recent user registrations
    const safeRecentUsers = Array.isArray(recentUsers) ? recentUsers : [];
    safeRecentUsers.slice(0, 2).forEach((user) => {
      activities.push({
        action: "New user registered",
        user: user.fullName || user.name,
        time: new Date(user.createdAt).toLocaleString(),
        type: "create"
      });
    });

    // Add recent orders
    if (stats?.recentOrders) {
      stats.recentOrders.slice(0, 2).forEach((order: any) => {
        activities.push({
          action: `Order #${order._id?.slice(-8)} placed`,
          user: order.userId?.name || "Unknown User",
          time: new Date(order.createdAt).toLocaleString(),
          type: "create"
        });
      });
    }

    // Sort by time (most recent first) and limit to 5
    return activities
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 5);
  };

  const activityLog = generateActivityLog();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-lg bg-white/80">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors lg:hidden"
              >
                <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="flex items-center gap-3">
                <img
                  src="/logo1.png"
                  alt="TapTo Logo"
                  className="w-10 h-10 rounded-xl object-contain"
                />
                <div>
                  <h1 className="text-xl font-bold text-slate-900">TapTo Admin</h1>
                  <p className="text-xs text-slate-500">Management Dashboard</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <input
                  type="search"
                  placeholder="Search users, actions..."
                  className="w-64 pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-slate-50 text-gray-900 placeholder-gray-500"
                />
                <svg className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
                <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-slate-900">{user?.fullName || 'Admin'}</p>
                  <p className="text-xs text-slate-500">{user?.email || ''}</p>
                </div>
                <Link href="/admin/profile" className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
                  {(user?.fullName || 'A').charAt(0).toUpperCase()}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-slate-200 transition-transform duration-300 z-30 pt-20 lg:pt-0`}>
          <div className="p-6 space-y-8">
            <nav className="space-y-2">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Main</div>
              <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary-50 text-primary-600 font-medium transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Dashboard
              </Link>
              <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-50 font-medium transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Users
              </Link>
              <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-50 font-medium transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Products
              </Link>
              <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-50 font-medium transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Orders
              </Link>
              <Link href="/admin/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-50 font-medium transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                My Profile
              </Link>
            </nav>

            <nav className="space-y-2">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Settings</div>
              <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-50 font-medium transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </Link>
              <LogoutButton className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-50 font-medium transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </LogoutButton>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {error ? (
              <div className="col-span-full bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="flex items-center gap-3">
                  <XCircle className="w-8 h-8 text-red-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-red-900">Error Loading Dashboard</h3>
                    <p className="text-red-700 mt-1">{error}</p>
                  </div>
                </div>
                <button
                  onClick={() => fetchStats(true)}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                  Try Again
                </button>
              </div>
            ) : loading ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                  <div className="animate-pulse">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-4 bg-slate-200 rounded w-20"></div>
                      <div className="w-10 h-10 bg-slate-200 rounded-lg"></div>
                    </div>
                    <div className="h-8 bg-slate-200 rounded mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded w-16"></div>
                  </div>
                </div>
              ))
            ) : stats ? (
              [
                {
                  label: "Total Users",
                  value: stats.totalUsers?.toLocaleString() || "0",
                  icon: Users,
                  color: "bg-primary-50 text-primary-600 border-primary-200",
                  change: "+12%",
                  changeType: "positive"
                },
                {
                  label: "Total Orders",
                  value: stats.totalOrders?.toLocaleString() || "0",
                  icon: ShoppingBag,
                  color: "bg-green-50 text-green-600 border-green-200",
                  change: "+8%",
                  changeType: "positive"
                },
                {
                  label: "Total Products",
                  value: stats.totalProducts?.toLocaleString() || "0",
                  icon: Package,
                  color: "bg-purple-50 text-purple-600 border-purple-200",
                  change: "+5%",
                  changeType: "positive"
                },
                {
                  label: "Total Revenue",
                  value: `$${(stats.totalRevenue || 0).toLocaleString()}`,
                  icon: DollarSign,
                  color: "bg-yellow-50 text-yellow-600 border-yellow-200",
                  change: "+15%",
                  changeType: "positive"
                },
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-600 mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</p>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          stat.changeType === 'positive' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {stat.change}
                        </span>
                        <span className="text-xs text-slate-500">vs last month</span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg border ${stat.color} shadow-sm`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-slate-500">Live data</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <BarChart3 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">Failed to load stats</h3>
                <button
                  onClick={() => fetchStats(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                  Retry
                </button>
              </div>
            )}
          </div>

          {/* Recent Users - full width */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm mb-6">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Users className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Recent Users</h2>
                  <p className="text-sm text-slate-600">Latest registered users</p>
                </div>
              </div>
              <Link href="/admin/users" className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1">
                View All
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {recentUsers.length > 0 ? recentUsers.map((u) => (
                    <tr key={u._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold text-sm">
                            {(u.fullName || u.name || 'U').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{u.fullName || u.name}</p>
                            <p className="text-sm text-slate-500">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {u.role === 'admin' ? 'Admin' : 'User'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/admin/users/${u._id}`}
                          className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Recent Orders */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <ShoppingBag className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Recent Orders</h2>
                    <p className="text-sm text-slate-600">Latest customer orders</p>
                  </div>
                </div>
                <Link href="/admin/orders" className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1">
                  View All
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="p-6">
                {stats?.recentOrders && stats.recentOrders.length > 0 ? (
                  <div className="space-y-4">
                    {stats.recentOrders.slice(0, 5).map((order: any, index: number) => (
                      <div key={index} className="flex items-center gap-4 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <ShoppingBag className="w-5 h-5 text-primary-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-slate-900">Order #{order._id?.slice(-8)}</p>
                          <p className="text-sm text-slate-600">
                            {order.userId?.name || 'Unknown User'} • {formatCurrency(order.total || 0)}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'shipped' ? 'bg-primary-100 text-primary-800' :
                            order.status === 'confirmed' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status}
                          </span>
                          <p className="text-xs text-slate-500 mt-1">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-600">No recent orders</p>
                  </div>
                )}
              </div>
            </div>

            {/* Product Analytics */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Package className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Product Analytics</h2>
                    <p className="text-sm text-slate-600">Inventory and performance insights</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 transition-colors">
                    <div className="flex items-center justify-center mb-2">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="text-2xl font-bold text-red-600">{stats?.lowStockProducts || 0}</div>
                    <div className="text-sm text-red-700 font-medium">Low Stock Items</div>
                    <div className="text-xs text-red-600 mt-1">Stock ≤ 10</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200 hover:bg-yellow-100 transition-colors">
                    <div className="flex items-center justify-center mb-2">
                      <Clock className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div className="text-2xl font-bold text-yellow-600">{stats?.pendingOrders || 0}</div>
                    <div className="text-sm text-yellow-700 font-medium">Pending Orders</div>
                    <div className="text-xs text-yellow-600 mt-1">Awaiting fulfillment</div>
                  </div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-green-600">${(stats?.todayRevenue || 0).toLocaleString()}</div>
                  <div className="text-sm text-green-700 font-medium">Today's Revenue</div>
                  <div className="text-xs text-green-600 mt-1">Real-time earnings</div>
                </div>
              </div>
            </div>
            {/* Activity Log */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Activity className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Activity Log</h2>
                    <p className="text-sm text-slate-600">Recent system activities</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                {activityLog.length > 0 ? (
                  <div className="space-y-4">
                    {activityLog.map((activity, index) => (
                      <div key={index} className="flex gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className={`w-3 h-3 mt-1 rounded-full flex-shrink-0 ${
                          activity.type === 'create' ? 'bg-green-500' : 
                          activity.type === 'update' ? 'bg-primary-500' : 'bg-red-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                          <p className="text-sm text-slate-600">{activity.user}</p>
                          <p className="text-xs text-slate-500 mt-1">
                            {new Date(activity.time).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Activity className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-600">No recent activities</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-primary-600 rounded-xl p-8 text-white shadow-sm">
            <div className="flex items-center justify-between flex-wrap gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">Quick Actions</h3>
                <p className="text-primary-100 text-lg">Manage your system efficiently with powerful tools</p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Real-time Analytics</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">User Management</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                    <Package className="w-4 h-4" />
                    <span className="text-sm">Product Control</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/admin/users/create"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Users className="w-5 h-5" />
                  Create New User
                </Link>
                <Link
                  href="/admin/products/create"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition-all duration-200"
                >
                  <Package className="w-5 h-5" />
                  Add Product
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
            