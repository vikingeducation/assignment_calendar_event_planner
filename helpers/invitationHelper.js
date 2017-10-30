var InvitationHelper = {};

InvitationHelper.newInvitationPath = (eventId) => `/invitations/new/${ eventId }`;
InvitationHelper.destroyInvitationPath = (id) => `/invitations/${ id }?_method=delete`;

InvitationHelper.invitationFormAction = (invitation) => {
  if (invitation) {
    return `/invitations/${ invitation.id }`;
  } else {
    return '/invitations';
  }
};

module.exports = InvitationHelper;
