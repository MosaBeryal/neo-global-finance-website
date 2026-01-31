'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { LogOut, Mail, ChevronDown, Send, X } from 'lucide-react';

interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  created_at: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [sendingReply, setSendingReply] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'read' | 'replied'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const response = await fetch('/api/admin/contacts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
        return;
      }

      const data = await response.json();
      if (data.success) {
        setContacts(data.contacts || []);
      }
    } catch (error) {
      console.error('[v0] Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  const handleSendReply = async () => {
    if (!selectedContact || !replyMessage.trim()) return;

    setSendingReply(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/contacts/${selectedContact.id}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: replyMessage }),
      });

      if (response.ok) {
        setReplyMessage('');
        setSelectedContact({ ...selectedContact, status: 'replied' });
        // Update contact in list
        setContacts(
          contacts.map((c) =>
            c.id === selectedContact.id ? { ...c, status: 'replied' } : c
          )
        );
        alert('Reply sent successfully!');
      } else {
        alert('Failed to send reply');
      }
    } catch (error) {
      console.error('[v0] Error sending reply:', error);
      alert('Error sending reply');
    } finally {
      setSendingReply(false);
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    const matchesStatus = filterStatus === 'all' || contact.status === filterStatus;
    const matchesSearch =
      contact.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'read':
        return 'bg-yellow-100 text-yellow-800';
      case 'replied':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">N</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
                <p className="text-sm text-foreground/60">Manage Contact Submissions</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2 bg-transparent"
            >
              <LogOut size={18} />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Contact List */}
          <div className="lg:col-span-2">
            <Card className="p-6 border border-border">
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {contacts.filter((c) => c.status === 'new').length}
                    </p>
                    <p className="text-xs text-blue-600 font-medium">New</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-yellow-600">
                      {contacts.filter((c) => c.status === 'read').length}
                    </p>
                    <p className="text-xs text-yellow-600 font-medium">Read</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {contacts.filter((c) => c.status === 'replied').length}
                    </p>
                    <p className="text-xs text-green-600 font-medium">Replied</p>
                  </div>
                </div>

                {/* Search & Filter */}
                <div className="space-y-4">
                  <Input
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="text-base"
                  />
                  <div className="flex gap-2 flex-wrap">
                    {(['all', 'new', 'read', 'replied'] as const).map((status) => (
                      <Button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        variant={filterStatus === status ? 'default' : 'outline'}
                        size="sm"
                        className="capitalize"
                      >
                        {status}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Contact List */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {loading ? (
                    <div className="text-center py-8 text-foreground/60">Loading...</div>
                  ) : filteredContacts.length === 0 ? (
                    <div className="text-center py-8 text-foreground/60">
                      No contacts found
                    </div>
                  ) : (
                    filteredContacts.map((contact) => (
                      <div
                        key={contact.id}
                        onClick={() => setSelectedContact(contact)}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          selectedContact?.id === contact.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-primary truncate">
                              {contact.first_name} {contact.last_name}
                            </p>
                            <p className="text-sm text-foreground/60 truncate">{contact.email}</p>
                            <p className="text-xs text-foreground/50 mt-1">
                              {formatDate(contact.created_at)}
                            </p>
                          </div>
                          <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(contact.status)}`}>
                            {contact.status}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Right: Contact Details & Reply */}
          <div className="lg:col-span-1">
            {selectedContact ? (
              <Card className="p-6 border border-border sticky top-24">
                <div className="space-y-6">
                  {/* Contact Info */}
                  <div>
                    <h2 className="text-xl font-bold text-primary mb-4">Contact Details</h2>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="text-foreground/60 font-medium">Name</p>
                        <p className="text-foreground">
                          {selectedContact.first_name} {selectedContact.last_name}
                        </p>
                      </div>
                      <div>
                        <p className="text-foreground/60 font-medium">Email</p>
                        <a href={`mailto:${selectedContact.email}`} className="text-primary hover:underline">
                          {selectedContact.email}
                        </a>
                      </div>
                      {selectedContact.company && (
                        <div>
                          <p className="text-foreground/60 font-medium">Company</p>
                          <p className="text-foreground">{selectedContact.company}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-foreground/60 font-medium">Date</p>
                        <p className="text-foreground">{formatDate(selectedContact.created_at)}</p>
                      </div>
                      <div>
                        <p className="text-foreground/60 font-medium">Status</p>
                        <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedContact.status)}`}>
                          {selectedContact.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <hr className="border-border" />

                  {/* Message */}
                  <div>
                    <p className="text-foreground/60 font-medium mb-2 text-sm">Message</p>
                    <div className="bg-background p-4 rounded-lg border border-border text-sm leading-relaxed max-h-40 overflow-y-auto">
                      {selectedContact.message}
                    </div>
                  </div>

                  <hr className="border-border" />

                  {/* Reply Section */}
                  {selectedContact.status !== 'replied' && (
                    <div className="space-y-3">
                      <p className="font-semibold text-primary text-sm">Send Reply</p>
                      <Textarea
                        placeholder="Type your reply message here..."
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        className="text-sm resize-none min-h-32"
                      />
                      <Button
                        onClick={handleSendReply}
                        disabled={sendingReply || !replyMessage.trim()}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
                      >
                        {sendingReply ? 'Sending...' : 'Send Reply'}
                        <Send size={16} className="ml-2" />
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ) : (
              <Card className="p-6 border border-border text-center text-foreground/60">
                <Mail size={32} className="mx-auto mb-2 opacity-50" />
                <p>Select a contact to view details and send replies</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
