using Microsoft.AspNetCore.Identity;

public class AppUser : IdentityUser
{
    public string Name { get; set; }

    public string? Bio { get; set; }
}