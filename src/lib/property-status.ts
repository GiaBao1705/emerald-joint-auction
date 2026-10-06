export const getEffectivePropertyStatus = (
  status: string | null | undefined,
  acceptanceEndAt: string | null | undefined,
  now = new Date(),
): string => {
  if (status !== "Đang nhận hồ sơ" || !acceptanceEndAt) {
    return status || "Đang nhận hồ sơ";
  }

  const deadline = new Date(acceptanceEndAt);
  if (!Number.isNaN(deadline.getTime()) && deadline.getTime() <= now.getTime()) {
    return "Đã kết thúc";
  }

  return status;
};
