using backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace backend.Services
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        User GetById(int id);
    }

    public class UserService : IUserService
    {
        private backendContext _context;

        public UserService(backendContext context)
        {
            _context = context;
        }

        public User Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            var user = _context.Users.SingleOrDefault(x => x.Username == username);

            // check if username exists
            if (user == null)
                return null;

            // check if password is correct
            if (password != user.Password)
                return null;

            // authentication successful
            return user;
        }
        public User GetById(int id)
        {
            return _context.Users.Find(id);
        }

    }
}