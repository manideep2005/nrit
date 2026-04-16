import React, { useState } from 'react';
import { 
  Wallet, 
  CreditCard, 
  TrendingUp, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  FileText, 
  Download,
  AlertCircle,
  PiggyBank,
  PieChart,
  History
} from 'lucide-react';

const Finance = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <FinanceOverview userRole={userRole} />;
      case 'fees': return <FeesManagement userRole={userRole} />;
      case 'ledger': return <LedgerView />;
      default: return <FinanceOverview userRole={userRole} />;
    }
  };

  return (
    <div className="finance-container animate-in">
      <div className="sub-nav-header">
        <div className="nav-tabs">
          <button 
            className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <PieChart size={18} />
            <span>Financial Overview</span>
          </button>
          <button 
            className={`nav-tab ${activeTab === 'fees' ? 'active' : ''}`}
            onClick={() => setActiveTab('fees')}
          >
            <CreditCard size={18} />
            <span>Fees & Payments</span>
          </button>
          <button 
            className={`nav-tab ${activeTab === 'ledger' ? 'active' : ''}`}
            onClick={() => setActiveTab('ledger')}
          >
            <History size={18} />
            <span>Transaction Ledger</span>
          </button>
        </div>
      </div>

      <div className="module-content mt-6">
        {renderContent()}
      </div>
    </div>
  );
};

const FinanceOverview = ({ userRole }) => {
  const [balance, setBalance] = useState(1250);
  const [isPaying, setIsPaying] = useState(false);

  const handlePayNow = () => {
    setIsPaying(true);
    setTimeout(() => {
      alert(`Payment of $${balance} Successful! Balance is now $0.00`);
      setBalance(0);
      setIsPaying(false);
    }, 2000);
  };

  const stats = [
    { label: 'Outstanding Balance', value: `$${balance.toLocaleString()}.00`, icon: Wallet, color: '#ef4444' },
    { label: 'Scholarship Applied', value: '$3,500.00', icon: PiggyBank, color: '#10b981' },
    { label: 'Total Paid (YTD)', value: '$12,450.00', icon: TrendingUp, color: '#3b82f6' },
  ];

  return (
    <div className="finance-overview">
      <div className="stats-grid mb-6">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card card">
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
              <stat.icon size={24} />
            </div>
            <div className="stat-info">
              <span className="stat-label">{stat.label}</span>
              <h3 className="stat-value">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="main-section flex flex-col gap-6">
          <div className="card h-fit">
            <div className="section-header">
              <h3>Recent Transactions</h3>
              <button className="btn-text">View Ledger</button>
            </div>
            <div className="activity-list border-t mt-4">
              {[
                { type: 'debit', desc: 'Semester 4 Tuition Fee', amount: '-$5,000.00', date: 'April 02, 2026', status: 'Success' },
                { type: 'credit', desc: 'Merit Scholarship Credit', amount: '+$2,500.00', date: 'March 28, 2026', status: 'Settled' },
                { type: 'debit', desc: 'Hostel Maintenance Fee', amount: '-$250.00', date: 'March 15, 2026', status: 'Success' },
              ].map((tx, idx) => (
                <div key={idx} className="activity-item px-0">
                  <div className={`activity-icon ${tx.type === 'debit' ? 'red' : 'green'}`} style={{ backgroundColor: tx.type === 'debit' ? '#fef2f2' : '#f0fdf4', color: tx.type === 'debit' ? '#dc2626' : '#16a34a' }}>
                    {tx.type === 'debit' ? <ArrowUpCircle size={18} /> : <ArrowDownCircle size={18} />}
                  </div>
                  <div className="activity-details">
                    <p className="activity-text font-semibold">{tx.desc}</p>
                    <span className="activity-time">{tx.date}</span>
                  </div>
                  <div className="text-right">
                    <p className={`m-0 font-bold ${tx.type === 'debit' ? 'text-red-600' : 'text-green-600'}`}>{tx.amount}</p>
                    <span className="text-[10px] uppercase font-bold text-slate-400">{tx.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="side-section flex flex-col gap-6">
          <div className={`card bg-slate-900 text-white ${balance === 0 ? 'opacity-50' : ''}`}>
            <h4 className="flex items-center gap-2"><AlertCircle size={20} className="text-amber-400" /> Payment Alert</h4>
            <p className="text-sm text-slate-400 mt-2">
              {balance > 0 
                ? `You have an outstanding balance of $${balance}. Avoid late penalties by paying before April 15.`
                : 'All dues for the current cycle are cleared. Great job!'}
            </p>
            <button 
              className="btn btn-primary w-full mt-4 bg-amber-400 text-slate-900 border-none hover:bg-amber-500 disabled:bg-slate-700 disabled:text-slate-500"
              onClick={handlePayNow}
              disabled={isPaying || balance === 0}
            >
              {isPaying ? 'Processing...' : balance === 0 ? 'Dues Cleared' : 'Pay Now'}
            </button>
          </div>

          <div className="card flex flex-col items-center text-center p-6 gap-3">
             <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                <FileText size={28} />
             </div>
             <div>
                <h4 className="m-0">Tax Documents</h4>
                <p className="text-xs text-slate-500 mt-1">Download your 2025-26 fee payment receipts for tax purposes.</p>
             </div>
             <button className="btn btn-outline btn-sm w-full" onClick={() => alert('Downloading 1098-T...')}>
               <Download size={14} /> Download 1098-T
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeesManagement = () => {
  return (
    <div className="fees-section flex flex-col gap-6">
      <div className="card">
        <div className="section-header">
          <h3>Fee Breakdown - Semester 4</h3>
          <button className="btn btn-primary btn-sm" onClick={() => alert('Generating full breakdown PDF...')}>Print Breakdown</button>
        </div>
        <div className="table-responsive mt-4">
          <table className="custom-table">
            <thead className="bg-slate-50">
              <tr>
                <th>Component</th>
                <th>Total Amount</th>
                <th>Scholarship/Aid</th>
                <th>Already Paid</th>
                <th>Total Due</th>
              </tr>
            </thead>
            <tbody>
              {[
                { component: 'Tuition Fees', total: '$8,000', aid: '$3,000', paid: '$5,000', due: '$0' },
                { component: 'Lab & Material', total: '$1,200', aid: '$500', paid: '$0', due: '$700' },
                { component: 'Hostel & Mess', total: '$3,500', aid: '$0', paid: '$3,000', due: '$500' },
                { component: 'Health Insurance', total: '$150', aid: '$100', paid: '$0', due: '$50' },
              ].map((fee, i) => (
                <tr key={i}>
                  <td className="font-semibold">{fee.component}</td>
                  <td>{fee.total}</td>
                  <td className="text-green-600 font-medium">-{fee.aid}</td>
                  <td>{fee.paid}</td>
                  <td className={fee.due === '$0' ? 'text-green-600' : 'text-red-600 font-bold'}>{fee.due}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-50">
               <tr>
                 <td colSpan="4" className="text-right font-bold py-4">Current Semester Balance:</td>
                 <td className="text-red-600 font-bold text-lg">$1,250</td>
               </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

const LedgerView = () => (
  <div className="ledger-container card p-0 overflow-hidden">
    <div className="p-6 border-b flex justify-between items-center">
      <h3>Full Transaction History</h3>
      <div className="flex gap-2">
        <button className="btn btn-outline btn-sm" onClick={() => alert('Exporting full ledger to CSV...')}>
          <Download size={14} /> Export CSV
        </button>
        <button className="btn btn-outline btn-sm" onClick={() => alert('Redirecting to Grievance portal for ticket support.')}>
          <AlertCircle size={14} /> Raise Ticket
        </button>
      </div>
    </div>
    <div className="ledger-content">
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="ledger-row items-center border-b last:border-0 hover:bg-slate-50 cursor-pointer transition-all p-4 flex justify-between">
          <div className="flex gap-4 items-center">
             <div className="font-mono text-xs text-slate-400">#TX-99{i}</div>
             <div className="flex flex-col">
               <span className="font-semibold text-sm">Online Payment via Razorpay</span>
               <span className="text-[10px] text-slate-500">March {20-i}, 2026 • 11:45 AM</span>
             </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="badge success">Paid</span>
            <span className="amount debit text-red-600 font-bold">-$450.00</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Finance;
