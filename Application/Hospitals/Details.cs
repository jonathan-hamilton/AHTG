using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Hospitals
{
    public class Details
    {
        public class Query : IRequest<Result<Hospital>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Hospital>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Hospital>> Handle(Query request, CancellationToken cancellationToken)
            {
                var hospital = await _context.Hospitals.FindAsync(request.Id);

                return Result<Hospital>.Success(hospital);
            }
        }
    }
}