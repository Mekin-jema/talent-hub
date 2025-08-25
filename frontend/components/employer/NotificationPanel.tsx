// components/employer/NotificationPanel.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface NotificationPanelProps {
  notifications: any[];
}

const NotificationPanel = ({ notifications }: NotificationPanelProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Your recent notifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-4 border rounded-lg flex justify-between items-start ${!notification.isRead ? 'bg-muted/50' : ''}`}
            >
              <div>
                <p className="font-medium">{notification.message}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(notification.createdAt).toLocaleDateString()} • {notification.type}
                </p>
              </div>
              {!notification.isRead && (
                <Button variant="outline" size="sm">
                  Mark as read
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationPanel;