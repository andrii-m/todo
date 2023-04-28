export default function checkingExistenceUser(users, { name, phone }) {
  const user = users.find((user) => {
    return user.username === name && normalizePhone(user.phone) === phone;
  });

  return user && { ...user, phone: normalizePhone(user.phone) };
}

const normalizePhone = (phone) => {
  return phone.split(" ")[0];
};
