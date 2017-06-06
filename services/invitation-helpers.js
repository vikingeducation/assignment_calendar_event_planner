const attachInfoToInvitations = (invitations, events, users) => {
  let results = invitations.map(invitation => {
    
    // iterate through all the events to find event name
    for (let i = 0; i < events.length; i++) {
      if (events[i].id === invitation.eventId) {
          invitation.eventName = events[i].name;
      }
    }

    // then iterate through all users to find username and email,
    // attaching them to each invitation object
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === invitation.userId) {
          invitation.username = users[i].username;
          invitation.email = users[i].email;
      }
    }
    return invitation;
  });

  return results;
};

module.exports = {
  attachInfoToInvitations
};