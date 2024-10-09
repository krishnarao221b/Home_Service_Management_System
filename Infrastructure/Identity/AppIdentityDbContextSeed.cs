using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        protected AppIdentityDbContextSeed()
        {
        }

        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Krish",
                    Email = "krish@test.com",
                    UserName = "kris@test.com",
                    Address = new Address
                    {
                        FirstName = "Krish",
                        LastName = "Rao",
                        Street = "MG Road",
                        City = "Mangalore",
                        State = "Karnataka",
                        Zipcode = "575004"
                    }
                };
                await userManager.CreateAsync(user, "Pas$w0rd");
            }

        }


    }
}
