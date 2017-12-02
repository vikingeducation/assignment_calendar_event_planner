const amendInvitations = (invitations, events, users) => {
  invitations.forEach(invitation => {
    let eventFilter = events.filter(e => {
      return e.id === invitation.eventId;
    });
    let event = eventFilter[0];
    invitation.eventName = event.name;

    let userFilter = users.filter(u => {
      return u.id === invitation.userId;
    });
    let user = userFilter[0];
    invitation.userId = user.id;
    invitation.username = user.username;
    invitation.email = user.email;
  });
  return invitations;
};

module.exports = { amendInvitations };
