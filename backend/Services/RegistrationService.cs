using backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services
{
    public interface IRegistrationService
    {
        bool Authenticate(int EventId, int UserId);
    }

    public class RegistrationService : IRegistrationService
    {
        private backendContext _context;

        public RegistrationService(backendContext context)
        {
            _context = context;
        }

        public bool Authenticate(int EventId, int UsersId)
        {

            var userDB = _context.Users.SingleOrDefault(x => x.Id == UsersId);
            var eventDB = _context.Event.SingleOrDefault(x => x.Id == EventId);
            var registerDB = _context.Registration.SingleOrDefault(x => (x.UserId == UsersId)&&(x.EventId == EventId));

            // check if username exists
            if (userDB == null || eventDB == null)
                return false;
            if (registerDB != null)
                return false;

            // authentication successful
            return true;
        }
    }
}
