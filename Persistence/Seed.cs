using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser{ Name = "Jon", Bio="Jon's bio", UserName = "jon", Email="jon@test.com" },
                    new AppUser{ Name = "Tom", Bio="Tom's bio", UserName = "tom", Email="tom@test.com" },
                    new AppUser{ Name = "Jill", Bio="Jill's bio", UserName = "jill", Email="jill@test.com" }
                };

                foreach(var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if(context.Hospitals.Any()) return;

            var hospitals = new List<Hospital>
            {
                new Hospital
                {
                    Name = "Kaiser Walnut Creek",
                    Address = "123 Main Street",
                    City = "Walnut Creek",
                    State = "CA",
                    Zip = "94596",
                    Phone = "1-888-555-1212",
                    Email = "kp-wc@kp.org",
                    EnteredOn = DateTime.Now,
                    Image = "hospital-1.jpg",
                    Specialty = "Oncology",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                },
                new Hospital
                {
                    Name = "John Muir Walnut Creek",
                    Address = "1010 Ygnacio Valley Road",
                    City = "Walnut Creek",
                    State = "CA",
                    Zip = "94596",
                    Phone = "1-888-443-1333",
                    Email = "jm-wc@jm.org",
                    EnteredOn = DateTime.Now,
                    Image = "hospital-2.jpg",
                    Specialty = "Urgent Care",
                    Description = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."
                },
                new Hospital
                {
                    Name = "Mt Diablo Medical Center",
                    Address = "1324 Mt. Diablo Blvd",
                    City = "Concord",
                    State = "CA",
                    Zip = "94518",
                    Phone = "1-888-650-4566",
                    Email = "mtdiablo-concord@md.org",
                    EnteredOn = DateTime.Now,
                    Image = "hospital-3.jpg",
                    Specialty = "Urgent Care",
                    Description = "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio."
                },
                new Hospital
                {
                    Name = "Kaiser Oakland",
                    Address = "1413 MacArthur Blvd",
                    City = "Oakland",
                    State = "CA",
                    Zip = "94423",
                    Phone = "1-888-818-3325",
                    Email = "kp-ok@kp.org",
                    EnteredOn = DateTime.Now,
                    Image = "hospital-4.jpg",
                    Specialty = "Urgent Care",
                    Description = "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
                },
                new Hospital
                {
                    Name = "St. John Hospital",
                    Address = "1245 Shadelands Drive",
                    City = "Walnut Creek",
                    State = "CA",
                    Zip = "94596",
                    Phone = "1-888-331-8889",
                    Email = "sj-wc@st-john.org",
                    EnteredOn = DateTime.Now,
                    Image = "hospital-5.jpg",
                    Specialty = "Cardiology",
                    Description = "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur."
                },
                new Hospital
                {
                    Name = "Falmouth Hospital",
                    Address = "443 San Pablo Damn Rd",
                    City = "Oakland",
                    State = "CA",
                    Zip = "94543",
                    Phone = "1-888-787-3112",
                    Email = "information@falmouth-oakland.org",
                    EnteredOn = DateTime.Now,
                    Image = "hospital-6.jpg",
                    Specialty = "Children's Medicine",
                    Description = "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque ut nisl non dolor malesuada aliquet. Pellentesque hendrerit fringilla fringilla. Nullam vestibulum feugiat urna. Aenean egestas eu urna vitae blandit. Aliquam erat volutpat. Sed elementum mi sed sapien consectetur facilisis."
                }                                                                                
            };

            await context.Hospitals.AddRangeAsync(hospitals);
            await context.SaveChangesAsync();
        }
    }
}