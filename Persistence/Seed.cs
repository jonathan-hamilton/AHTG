using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if(context.Hospitals.Any()) return;

            var hospitals = new List<Hospital>
            {
                new Hospital
                {
                    Name = "Kaiser Walnut Creek",
                    Address = "123 Main Street",
                    City = "Walnut Creek",
                    State = "CA",
                    Zip = 94596,
                    Phone = "1-888-555-1212",
                    Email = "kp-wc@kp.org",
                    EnteredOn = DateTime.Now
                },
                new Hospital
                {
                    Name = "John Muir Walnut Creek",
                    Address = "1010 Ygnacio Valley Road",
                    City = "Walnut Creek",
                    State = "CA",
                    Zip = 94596,
                    Phone = "1-888-443-1333",
                    Email = "jm-wc@jm.org",
                    EnteredOn = DateTime.Now
                },
                new Hospital
                {
                    Name = "Mt Diablo Medical Center",
                    Address = "1324 Mt. Diablo Blvd",
                    City = "Concord",
                    State = "CA",
                    Zip = 94518,
                    Phone = "1-888-650-4566",
                    Email = "mtdiablo-concord@md.org",
                    EnteredOn = DateTime.Now
                },
                new Hospital
                {
                    Name = "Kaiser Oakland",
                    Address = "1413 MacArthur Blvd",
                    City = "Oakland",
                    State = "CA",
                    Zip = 94423,
                    Phone = "1-888-818-3325",
                    Email = "kp-ok@kp.org",
                    EnteredOn = DateTime.Now
                },
                new Hospital
                {
                    Name = "Alta Bates Medical Center",
                    Address = "1245 Shadelands Drive",
                    City = "Walnut Creek",
                    State = "CA",
                    Zip = 94596,
                    Phone = "1-888-331-8889",
                    Email = "ab-wc@alta-bates.org",
                    EnteredOn = DateTime.Now
                },
                new Hospital
                {
                    Name = "Children's Hospital Oakland",
                    Address = "443 San Pablo Damn Rd",
                    City = "Oakland",
                    State = "CA",
                    Zip = 94543,
                    Phone = "1-888-787-3112",
                    Email = "information@childrens-oakland.org",
                    EnteredOn = DateTime.Now
                }                                                                                
            };

            await context.Hospitals.AddRangeAsync(hospitals);
            await context.SaveChangesAsync();
        }
    }
}