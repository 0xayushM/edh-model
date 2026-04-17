interface VisitorData {
  timestamp: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  message?: string;
  source?: string;
  sessionId: string;
}

class VisitorTracker {
  private static instance: VisitorTracker;
  private sessionId: string;
  private hasTracked = false;

  private constructor() {
    this.sessionId = this.generateSessionId();
  }

  static getInstance(): VisitorTracker {
    if (!VisitorTracker.instance) {
      VisitorTracker.instance = new VisitorTracker();
    }
    return VisitorTracker.instance;
  }

  private generateSessionId(): string {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  
  private getVisitorData(contactInfo?: Partial<VisitorData>): VisitorData {
    return {
      timestamp: new Date().toISOString(),
      name: contactInfo?.name,
      email: contactInfo?.email,
      phone: contactInfo?.phone,
      company: contactInfo?.company,
      jobTitle: contactInfo?.jobTitle,
      message: contactInfo?.message,
      source: document.referrer || 'Direct',
      sessionId: this.sessionId
    };
  }

  async trackVisitor(contactInfo?: Partial<VisitorData>): Promise<void> {
    try {
      const visitorData = this.getVisitorData(contactInfo);
      
      await fetch(`${process.env.NEXT_PUBLIC_DASHBOARD_ENDPOINT}/${process.env.NEXT_PUBLIC_DASHBOARD_PROJECT_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: process.env.NEXT_PUBLIC_DASHBOARD_API_KEY,
          form_name: 'visitor-contact',
          data: visitorData
        })
      });
      
      console.log('Visitor contact tracked successfully');
    } catch (error) {
      console.error('Error tracking visitor contact:', error);
    }
  }

  getSessionId(): string {
    return this.sessionId;
  }
}

export default VisitorTracker;
export type { VisitorData };
