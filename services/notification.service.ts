import prisma from '../lib/prisma';

export async function createNotification(data: { userId: string; message: string; type: string }) {
  return await prisma.notification.create({
    data
  });
}

export async function getUserNotifications(userId: string) {
  return await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 20
  });
}

export async function markAsRead(notificationId: string) {
  return await prisma.notification.update({
    where: { id: notificationId },
    data: { isRead: true }
  });
}
