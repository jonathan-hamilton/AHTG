using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Hospitals
{
    public class Details
    {
        public class Query : IRequest<Hospital>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Hospital>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Hospital> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Hospitals.FindAsync(request.Id);
            }
        }
    }
}